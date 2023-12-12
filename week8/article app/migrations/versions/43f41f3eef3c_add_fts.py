"""Add FTS

Revision ID: 43f41f3eef3c
Revises: a3482a803eda
Create Date: 2023-08-28 23:55:09.158101

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy import text 

# revision identifiers, used by Alembic.
revision = '43f41f3eef3c'
down_revision = 'a3482a803eda'
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    sql = text("""
        CREATE VIRTUAL TABLE article_search USING fts5(title, content, content=article, content_rowid = article_id, tokenize = "porter unicode61");
    """)
    conn.execute(sql)


def downgrade():
    op.drop_table("article_search")