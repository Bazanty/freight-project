import click
import bcrypt
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from property.database import init_db, SessionLocal
from property.models import Agent, Property, Room, Client, Payment
from datetime import datetime  # Import datetime module

init_db()


@click.group()
def cli():
    """Property Management CLI."""
    pass

@click.command()
@click.option('--name', prompt='Your name', help='Name of the agent.')
@click.option('--email', prompt='Your email', help='Email of the agent.')
@click.option('--password', prompt='Your password', hide_input=True, confirmation_prompt=True, help='Password of the agent.')
def signup(name, email, password):
    """Register a new agent."""
    db = SessionLocal()
    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        agent = Agent(name=name, email=email, hashed_password=hashed_password)
        db.add(agent)
        db.commit()
        click.echo(f"Agent registered and logged in successfully as {name}!")
    except IntegrityError:
        db.rollback()
        click.echo("Email already exists. Please try a different email.")
    finally:
        db.close()
        
@click.command()
@click.option('--email', prompt='Your email', help='Email of the agent.')
@click.option('--password', prompt='Your password', hide_input=True, help='Password of the agent.')
def login(email, password):
    """Log in an existing agent."""
    db = SessionLocal()
    try:
        agent = db.query(Agent).filter(Agent.email == email).first()
        if agent and bcrypt.checkpw(password.encode('utf-8'), agent.hashed_password.encode('utf-8')):
            click.echo(f"Logged in successfully as {agent.name}!")
        else:
            click.echo("Invalid email or password. Please try again.")
    finally:
        db.close()

@click.command()
@click.option('--address', prompt='Property address', help='Address of the property.')
@click.option('--location', prompt='Property location', help='Location of the property.')
@click.option('--agent_id', prompt='Agent ID', help='ID of the agent responsible for the property.', type=int)
def add_property(address, location, agent_id):
    """Add a new property."""
    db = SessionLocal()
    try:
        property = Property(address=address, location=location, agent_id=agent_id)
        db.add(property)
        db.commit()
        click.echo(f"Property at {address} added successfully!")
    except IntegrityError:
        db.rollback()
        click.echo("Failed to add property. Please check the provided details.")
    finally:
        db.close() 

@click.command()
@click.option('--name', prompt='Client name', help='Name of the client.')
@click.option('--email', prompt='Client email', help='Email of the client.')
@click.option('--password', prompt='Client password', hide_input=True, confirmation_prompt=True, help='Password of the client.')
@click.option('--agent_id', prompt='Agent ID', help='ID of the agent responsible for the client.', type=int)
@click.option('--property_id', prompt='Property ID', help='ID of the property associated with the client.', type=int)
def add_client(name, email, password, agent_id, property_id):
    """Add a new client."""
    db = SessionLocal()
    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        client = Client(name=name, email=email, hashed_password=hashed_password, agent_id=agent_id, property_id=property_id)
        db.add(client)
        db.commit()
        click.echo(f"Client {name} added successfully!")
    except IntegrityError:
        db.rollback()
        click.echo("Failed to add client. Please check the provided details.")
    finally:
        db.close()

@click.command()
@click.option('--type', prompt='Room type', help='Type of the room.')
@click.option('--size', prompt='Room size', help='Size of the room.', type=float)
@click.option('--property_id', prompt='Property ID', help='ID of the property to which the room belongs.', type=int)
def add_room(type, size, property_id):
    """Add a new room to a property."""
    db = SessionLocal()
    try:
        room = Room(type=type, size=size, property_id=property_id)
        db.add(room)
        db.commit()
        click.echo(f"Room of type {type} with size {size} added successfully to property ID {property_id}!")
    except IntegrityError:
        db.rollback()
        click.echo("Failed to add room. Please check the provided details.")
    finally:
        db.close()        
               

cli.add_command(signup)
cli.add_command(login)
cli.add_command(add_property)
cli.add_command(add_client)
cli.add_command(add_room)


if __name__ == '__main__':
    cli()
