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

cli.add_command(signup)
cli.add_command(login)


if __name__ == '__main__':
    cli()
