"""Add FTS related Triggers

Revision ID: 9a55a24ae22e
Revises: 43f41f3eef3c
Create Date: 2023-08-29 00:00:14.263305

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import text

# revision identifiers, used by Alembic.
revision = '9a55a24ae22e'
down_revision = '43f41f3eef3c'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    sql = text("""
        CREATE TRIGGER article_ai AFTER INSERT ON article BEGIN 
            INSERT INTO article_search(rowid, title, content) VALUES (new_id, new_title, new_content)
        END
    """)
    conn.execute(sql)
    sql = text("""
        CREATE TRIGGER article_ad AFTER DELETE ON article BEGIN 
            INSERT INTO article_search(article_search, rowid, title, content)
        END
    """)
    conn.execute(sql)
    sql = text("""
        CREATE TRIGGER article_au AFTER UPDATE ON article BEGIN 
            INSERT INTO article_search(article_search, rowid, title, content) VALUES (new_id, new_title, new_content)
            INSERT INTO article_search(rowid, title, content) VALUES (new_id, new_title, new_content)
        END
    """)
    conn.execute(sql)
    sql = text("""
        INSERT INTO article_search(article_search) VALUES (new_id, new_title, new_content)
    """)
    conn.execute(sql)


def downgrade():
    conn = op.get_bind()
    sql = text("""DROP TRIGGER article_ai""")
    conn.execute(sql)
    sql = text("""DROP TRIGGER article_ad""")
    conn.execute(sql)
    sql = text("""DROP TRIGGER article_au""")
    conn.execute(sql)
