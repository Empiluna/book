#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
生成概要设计所需的非时序图（重绘版）
修复: 字体重叠、箭头过短、元素拥挤等问题
"""
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import (FancyBboxPatch, FancyArrowPatch, Circle,
                                 Polygon, Rectangle, Arc)
import numpy as np
import os, sys, io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

plt.rcParams['font.family'] = 'Microsoft YaHei'
plt.rcParams['font.size'] = 12
plt.rcParams['axes.unicode_minus'] = False

OUTPUT_DIR = 'document/diagrams'
os.makedirs(OUTPUT_DIR, exist_ok=True)

C = {
    'primary': '#2563EB', 'primary_dark': '#1D4ED8',
    'secondary': '#059669', 'accent': '#EA580C', 'purple': '#7C3AED',
    'teal': '#0D9488', 'red': '#DC2626', 'pink': '#DB2777',
    'dark': '#1E293B', 'gray': '#64748B', 'light_gray': '#CBD5E1',
    'bg': '#F8FAFC', 'white': '#FFFFFF', 'text': '#1E293B',
    'blue_light': '#DBEAFE', 'green_light': '#D1FAE5',
    'orange_light': '#FED7AA', 'purple_light': '#EDE9FE',
    'teal_light': '#CCFBF1', 'red_light': '#FEE2E2',
    'yellow': '#F59E0B', 'yellow_light': '#FEF3C7', 'indigo': '#4F46E5',
}

SPINE_COLOR = '#CBD5E1'


# ═══════════════════════════════════════
# 通用工具
# ═══════════════════════════════════════
def new_figure(width=24, height=16, dpi=150):
    fig, ax = plt.subplots(figsize=(width, height), dpi=dpi)
    ax.set_xlim(0, width * 100)
    ax.set_ylim(0, height * 100)
    ax.set_aspect('equal')
    ax.axis('off')
    fig.patch.set_facecolor(C['white'])
    return fig, ax, width * 100, height * 100


def save_image(fig, name):
    path = os.path.join(OUTPUT_DIR, name)
    fig.savefig(path, dpi=150, bbox_inches='tight', pad_inches=0.3,
                facecolor=C['white'], edgecolor='none')
    plt.close(fig)
    print(f'  [OK] {name}')


def draw_box(ax, x, y, w, h, text, color, text_color='white',
             fontsize=12, radius=8):
    """实心圆角矩形"""
    FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                   boxstyle=f"round,pad=0,rounding_size={radius}",
                   facecolor=color, edgecolor=color, linewidth=0,
                   zorder=4, clip_on=False).set_clip_on(False)
    ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                                 boxstyle=f"round,pad=0,rounding_size={radius}",
                                 facecolor=color, edgecolor=color, linewidth=0))
    lines = text.split('\n')
    for i, line in enumerate(lines):
        ax.text(x, y + (len(lines) / 2 - i - 0.5) * (fontsize + 3),
                line, ha='center', va='center', fontsize=fontsize,
                fontweight='bold', color=text_color, zorder=6)


def draw_box_outline(ax, x, y, w, h, text, color, fontsize=11, lw=2.5, radius=8):
    """轮廓圆角矩形"""
    ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                                 boxstyle=f"round,pad=0,rounding_size={radius}",
                                 facecolor='white', edgecolor=color, linewidth=lw))
    lines = text.split('\n')
    for i, line in enumerate(lines):
        ax.text(x, y + (len(lines) / 2 - i - 0.5) * (fontsize + 2),
                line, ha='center', va='center', fontsize=fontsize,
                color=C['dark'], zorder=5)


def draw_arrow(ax, x1, y1, x2, y2, color=C['gray'], lw=2.5, style='->', rad=0):
    ax.add_patch(FancyArrowPatch((x1, y1), (x2, y2), arrowstyle=style,
                                  color=color, linewidth=lw,
                                  connectionstyle=f'arc3,rad={rad}',
                                  mutation_scale=22, zorder=2))


def draw_label(ax, x, y, text, fontsize=10, color=None, ha='center', va='center',
               bold=False, bg=False):
    kwargs = dict(fontsize=fontsize, ha=ha, va=va, zorder=6,
                  fontweight='bold' if bold else 'normal',
                  color=color or C['text'])
    if bg:
        kwargs['bbox'] = dict(boxstyle='round,pad=3', facecolor='white',
                              edgecolor='none', alpha=0.9)
    ax.text(x, y, text, **kwargs)


# ═══════════════════════════════════════
# 09 MySQL数据库ER图 (完整重绘)
# ═══════════════════════════════════════
def generate_er_diagram():
    fig, ax, W, H = new_figure(30, 20)
    ax.text(W / 2, H - 20, 'MySQL数据库实体关系图 (ER Diagram)', ha='center',
            fontsize=22, fontweight='bold', color=C['dark'])

    # Entity definitions — positioned with generous spacing
    # (name, cx, cy, fields_list, color)
    # Each entity: header + field rows
    entities = [
        ('users', 220, H * 0.82, [
            ('id', 'PK'), ('username', 'UQ'), ('email', 'UQ'),
            ('hashed_password', ''), ('is_active', ''), ('is_admin', ''),
            ('created_at', ''), ('updated_at', '')], C['primary']),
        ('authors', 220, H * 0.42, [
            ('id', 'PK'), ('name', 'UQ'), ('bio', ''), ('avatar_url', '')],
         C['secondary']),
        ('books', W * 0.43, H * 0.64, [
            ('id', 'PK'), ('title', ''), ('subtitle', ''), ('isbn', 'UQ'),
            ('publisher_id', 'FK'), ('series_id', 'FK'), ('publication_year', ''),
            ('description', ''), ('cover_url', ''), ('page_count', ''),
            ('avg_rating', ''), ('rating_count', ''), ('is_new', ''),
            ('hot_score', ''), ('purchase_url_jd', ''), ('purchase_url_dd', ''),
            ('purchase_url_tb', ''), ('created_at', '')], C['accent']),
        ('publishers', W * 0.68, H * 0.88, [
            ('id', 'PK'), ('name', 'UQ')], C['teal']),
        ('tags', W * 0.68, H * 0.64, [
            ('id', 'PK'), ('name', 'UQ'), ('category', '')], C['purple']),
        ('series', W * 0.68, H * 0.40, [
            ('id', 'PK'), ('name', 'UQ'), ('description', '')], C['pink']),
        ('reading_history', W * 0.90, H * 0.90, [
            ('id', 'PK'), ('user_id', 'FK'), ('book_id', 'FK'),
            ('status', ''), ('read_at', '')], C['indigo']),
        ('reading_progress', W * 0.94, H * 0.66, [
            ('id', 'PK'), ('user_id', 'FK'), ('book_id', 'FK'),
            ('progress_percent', ''), ('current_page', ''), ('updated_at', '')],
         C['yellow']),
        ('user_ratings', W * 0.94, H * 0.42, [
            ('id', 'PK'), ('user_id', 'FK'), ('book_id', 'FK'),
            ('rating', ''), ('created_at', '')], C['red']),
        ('bookmarks', W * 0.50, H * 0.32, [
            ('id', 'PK'), ('user_id', 'FK'), ('book_id', 'FK'),
            ('shelf_name', ''), ('created_at', '')], C['secondary']),
        ('book_comments', W * 0.72, H * 0.16, [
            ('id', 'PK'), ('user_id', 'FK'), ('book_id', 'FK'),
            ('content', ''), ('likes_count', ''), ('is_pinned', ''),
            ('created_at', '')], C['teal']),
        ('comment_likes', W * 0.90, H * 0.17, [
            ('id', 'PK'), ('user_id', 'FK'), ('comment_id', 'FK'),
            ('created_at', '')], C['purple']),
        ('search_logs', W * 0.28, H * 0.32, [
            ('id', 'PK'), ('user_id', 'FK'), ('keyword', ''),
            ('created_at', '')], C['indigo']),
        ('chat_history', W * 0.15, H * 0.16, [
            ('id', 'PK'), ('user_id', 'FK'), ('role', ''),
            ('content', ''), ('intent_type', ''), ('created_at', '')],
         C['primary_dark']),
        ('book_author', W * 0.30, H * 0.64, [
            ('book_id', 'PK,FK'), ('author_id', 'PK,FK')], C['primary']),
        ('book_tag', W * 0.58, H * 0.80, [
            ('book_id', 'PK,FK'), ('tag_id', 'PK,FK')], C['purple']),
    ]

    ew, fh = 190, 13  # entity width, per-field height
    positions = {}

    for name, cx, cy, fields, color in entities:
        nf = len(fields)
        eh = 24 + nf * fh + 10
        # Header bar
        ax.add_patch(FancyBboxPatch((cx - ew / 2, cy + eh / 2 - 24), ew, 24,
                                     boxstyle="round,pad=0,rounding_size=5",
                                     facecolor=color, edgecolor=color, linewidth=0))
        # Body
        ax.add_patch(FancyBboxPatch((cx - ew / 2, cy - eh / 2), ew, eh,
                                     boxstyle="round,pad=0,rounding_size=5",
                                     facecolor='white', edgecolor=color, linewidth=2))
        # Table name
        ax.text(cx, cy + eh / 2 - 12, name, ha='center', va='center',
                fontsize=9, fontweight='bold', color='white', zorder=5)
        # Divider
        ax.plot([cx - ew / 2 + 4, cx + ew / 2 - 4],
                [cy + eh / 2 - 26, cy + eh / 2 - 26], color=color, linewidth=1)
        # Fields
        for i, (fname, key) in enumerate(fields):
            fy = cy + eh / 2 - 28 - (i + 1) * fh
            ax.text(cx - ew / 2 + 6, fy, fname, ha='left', va='center',
                    fontsize=7, color=C['text'], fontfamily='monospace')
            if key:
                kc = C['red'] if 'FK' in key else C['primary']
                ax.text(cx + ew / 2 - 6, fy, f'<<{key}>>', ha='right', va='center',
                        fontsize=6.5, color=kc, fontweight='bold')
        positions[name] = (cx, cy, ew, eh, color)

    def arrow_btw(a_name, b_name, side_a='bottom', side_b='top',
                  color=C['gray'], label=''):
        """Draw relationship arrow between two entity boxes"""
        ax1, ay1, aw1, ah1, _ = positions[a_name]
        ax2, ay2, aw2, ah2, _ = positions[b_name]
        if side_a == 'bottom':
            y1 = ay1 - ah1 / 2
        elif side_a == 'top':
            y1 = ay1 + ah1 / 2
        elif side_a == 'right':
            y1 = ay1
            ax1 = ax1 + aw1 / 2
        else:
            y1 = ay1
            ax1 = ax1 - aw1 / 2
        if side_b == 'bottom':
            y2 = ay2 - ah2 / 2
        elif side_b == 'top':
            y2 = ay2 + ah2 / 2
        elif side_b == 'right':
            y2 = ay2
            ax2 = ax2 + aw2 / 2
        else:
            y2 = ay2
            ax2 = ax2 - aw2 / 2
        draw_arrow(ax, ax1, y1, ax2, y2, color, lw=1.8)
        if label:
            draw_label(ax, (ax1 + ax2) / 2, (y1 + y2) / 2, label, 8,
                       color=color, bg=True)

    # Relationship arrows — users to child tables
    arrow_btw('users', 'reading_history', 'bottom', 'top', C['indigo'], '1:N')
    arrow_btw('users', 'reading_progress', 'bottom', 'top', C['yellow'], '1:N')
    arrow_btw('users', 'user_ratings', 'bottom', 'top', C['red'], '1:N')
    arrow_btw('users', 'bookmarks', 'bottom', 'top', C['secondary'], '1:N')
    arrow_btw('users', 'book_comments', 'bottom', 'top', C['teal'], '1:N')
    arrow_btw('users', 'search_logs', 'bottom', 'top', C['indigo'], '1:N')
    arrow_btw('users', 'chat_history', 'bottom', 'top', C['primary_dark'], '1:N')
    # users → comment_likes
    uc = positions['users']
    cl = positions['comment_likes']
    draw_arrow(ax, uc[0], uc[1] - uc[3] / 2, cl[0] - cl[2] / 2, cl[1] + cl[3] / 2,
               C['purple'], 1.8)
    # books → child tables
    arrow_btw('books', 'reading_history', 'right', 'left', C['indigo'], '1:N')
    arrow_btw('books', 'reading_progress', 'right', 'left', C['yellow'], '1:N')
    arrow_btw('books', 'user_ratings', 'right', 'left', C['red'], '1:N')
    arrow_btw('books', 'bookmarks', 'bottom', 'top', C['secondary'], '1:N')
    arrow_btw('books', 'book_comments', 'bottom', 'top', C['teal'], '1:N')
    arrow_btw('books', 'publishers', 'right', 'left', C['teal'], 'N:1')
    arrow_btw('books', 'series', 'right', 'left', C['pink'], 'N:1')
    arrow_btw('books', 'book_author', 'left', 'right', C['primary'], 'N:M')
    arrow_btw('authors', 'book_author', 'top', 'bottom', C['primary'], 'N:M')
    arrow_btw('books', 'book_tag', 'top', 'bottom', C['purple'], 'N:M')
    arrow_btw('tags', 'book_tag', 'bottom', 'top', C['purple'], 'N:M')
    # book_comments → comment_likes
    arrow_btw('book_comments', 'comment_likes', 'right', 'left', C['purple'], '1:N')

    # Legend
    for i, (label, color) in enumerate([
        ('PK = Primary Key', C['primary']),
        ('FK = Foreign Key', C['red']),
        ('UQ = Unique', C['teal']),
    ]):
        draw_label(ax, W * 0.06, H * 0.94 - i * 18, f'■  {label}', 9, color, 'left')

    save_image(fig, '09_MySQL数据库ER图.png')


# ═══════════════════════════════════════
# 10 系统核心类图 (UML)
# ═══════════════════════════════════════
def draw_uml_class(ax, cx, cy, cw, name, attrs, methods, color):
    """绘制UML类框，自动计算高度"""
    na, nm = len(attrs), len(methods)
    ah = na * 13 + 8
    mh = nm * 13 + 8
    th = 26 + ah + mh + 8
    # Name section
    ax.add_patch(FancyBboxPatch((cx - cw / 2, cy + th / 2 - 26), cw, 26,
                                 boxstyle="round,pad=0,rounding_size=4",
                                 facecolor=color, edgecolor=color, linewidth=0))
    # Attributes
    ax.add_patch(FancyBboxPatch((cx - cw / 2, cy - th / 2 + mh + 6), cw, ah,
                                 boxstyle="round,pad=0,rounding_size=0",
                                 facecolor='white', edgecolor=color, linewidth=1.5))
    # Methods
    ax.add_patch(FancyBboxPatch((cx - cw / 2, cy - th / 2), cw, mh + 6,
                                 boxstyle="round,pad=0,rounding_size=4",
                                 facecolor='white', edgecolor=color, linewidth=1.5))
    # Border
    ax.add_patch(FancyBboxPatch((cx - cw / 2, cy - th / 2), cw, th,
                                 boxstyle="round,pad=0,rounding_size=4",
                                 facecolor='none', edgecolor=color, linewidth=2))
    # Name text
    ax.text(cx, cy + th / 2 - 13, name, ha='center', va='center',
            fontsize=10, fontweight='bold', color='white', zorder=6)
    # Separators
    sep_y1 = cy + th / 2 - 27
    sep_y2 = cy - th / 2 + mh + 4
    ax.plot([cx - cw / 2 + 4, cx + cw / 2 - 4], [sep_y1, sep_y1], color=color, lw=1)
    ax.plot([cx - cw / 2 + 4, cx + cw / 2 - 4], [sep_y2, sep_y2], color=color, lw=1)
    # Attribute text
    for i, a in enumerate(attrs):
        ax.text(cx - cw / 2 + 5, cy + th / 2 - 30 - i * 13, a, ha='left',
                va='center', fontsize=7.5, color=C['text'], fontfamily='monospace')
    # Method text
    for i, m in enumerate(methods):
        ax.text(cx - cw / 2 + 5, cy - th / 2 + mh + 2 - i * 13, m, ha='left',
                va='center', fontsize=7.5, color=C['text'], fontfamily='monospace')
    return (cx, cy, cw, th, color)


def generate_class_diagram():
    fig, ax, W, H = new_figure(26, 16)
    ax.text(W / 2, H - 18, '系统核心类图 (UML Class Diagram)', ha='center',
            fontsize=22, fontweight='bold', color=C['dark'])

    # Entity classes (top row) — widely spaced
    draw_uml_class(ax, W * 0.10, H * 0.58, 190, '<<model>> User',
                   ['- id: int (PK)', '- username: str(UQ)', '- email: str(UQ)',
                    '- hashed_password: str', '- is_active: bool',
                    '- is_admin: bool', '- created_at: datetime'],
                   ['+ verify_password(pwd): bool'],
                   C['primary'])
    draw_uml_class(ax, W * 0.30, H * 0.58, 190, '<<model>> Book',
                   ['- id: int (PK)', '- title: str', '- isbn: str(UQ)',
                    '- publisher_id: int(FK)', '- series_id: int(FK)',
                    '- avg_rating: float', '- rating_count: int',
                    '- is_new: bool', '- hot_score: float', '- created_at: datetime'],
                   ['+ update_rating(): void'],
                   C['accent'])
    draw_uml_class(ax, W * 0.52, H * 0.58, 180, '<<model>> Author',
                   ['- id: int (PK)', '- name: str(UQ)', '- bio: str',
                    '- avatar_url: str'],
                   ['+ get_books(): List[Book]'],
                   C['secondary'])
    draw_uml_class(ax, W * 0.68, H * 0.58, 160, '<<model>> Tag',
                   ['- id: int (PK)', '- name: str(UQ)', '- category: str'],
                   [], C['purple'])
    draw_uml_class(ax, W * 0.84, H * 0.58, 170, '<<model>> ChatHistory',
                   ['- id: int (PK)', '- user_id: int(FK)', '- role: enum',
                    '- content: text', '- intent_type: str', '- created_at: datetime'],
                   [], C['primary_dark'])

    # Relations (bottom row)
    draw_uml_class(ax, W * 0.10, H * 0.28, 190, '<<model>> ReadingHistory',
                   ['- id: int', '- user_id: int(FK)', '- book_id: int(FK)',
                    '- status: str', '- read_at: datetime'], [], C['primary'])
    draw_uml_class(ax, W * 0.30, H * 0.28, 190, '<<model>> BookComment',
                   ['- id: int', '- user_id: int(FK)', '- book_id: int(FK)',
                    '- content: text', '- likes_count: int',
                    '- is_pinned: bool', '- created_at: datetime'],
                   [], C['teal'])
    draw_uml_class(ax, W * 0.50, H * 0.28, 190, '<<model>> UserRating',
                   ['- id: int', '- user_id: int(FK)', '- book_id: int(FK)',
                    '- rating: float', '- created_at: datetime'], [], C['red'])
    draw_uml_class(ax, W * 0.70, H * 0.28, 190, '<<model>> Bookmark',
                   ['- id: int', '- user_id: int(FK)', '- book_id: int(FK)',
                    '- shelf_name: str', '- created_at: datetime'], [], C['secondary'])

    # Service classes (right side)
    draw_uml_class(ax, W * 0.85, H * 0.82, 220, '<<service>> RecommendService',
                   ['- user_profile: UPRecommend', '- graph_paths: GraphPaths'],
                   ['+ recommend_kg(top_n): list', '+ recommend_cf(top_n): list',
                    '+ recommend_hot(top_n): list', '+ recommend_new(top_n): list',
                    '+ recommend_hybrid(top_n): list'], C['accent'])
    draw_uml_class(ax, W * 0.85, H * 0.44, 220, '<<service>> AIChatService',
                   ['- llm_client: OpenAI'],
                   ['+ process_message(db,user,msg): dict',
                    '+ _classify_intent(msg): dict',
                    '+ _build_context(intent,user): str',
                    '+ _check_bounds(msg): str',
                    '+ save_message(db,...): ChatHistory'],
                   C['primary_dark'])

    # Relationship lines — use longer spans
    def class_arrow(x1, y1, x2, y2, label='', color=C['light_gray']):
        draw_arrow(ax, x1, y1, x2, y2, color, lw=1.5, rad=0)
        if label:
            draw_label(ax, (x1 + x2) / 2, (y1 + y2) / 2 + 8, label, 8, C['gray'], bg=True)

    # User → children
    class_arrow(W * 0.10, H * 0.58 - 70, W * 0.10, H * 0.28 + 55, '1:N')
    class_arrow(W * 0.10 + 50, H * 0.58 - 80, W * 0.50, H * 0.28 + 50, '1:N')
    class_arrow(W * 0.10 + 70, H * 0.58 - 85, W * 0.70, H * 0.28 + 50, '1:N')
    class_arrow(W * 0.10, H * 0.58 - 90, W * 0.84, H * 0.58 - 40, '1:N (chat)')
    # Book → children
    class_arrow(W * 0.30, H * 0.58 - 80, W * 0.10 + 90, H * 0.28 + 50, '1:N')
    class_arrow(W * 0.30 + 40, H * 0.58 - 90, W * 0.30 + 40, H * 0.28 + 50, '1:N')
    class_arrow(W * 0.30 + 70, H * 0.58 - 95, W * 0.50 + 50, H * 0.28 + 50, '1:N')
    class_arrow(W * 0.30 + 90, H * 0.58 - 100, W * 0.70 + 30, H * 0.28 + 50, '1:N')
    # Cross-entity
    class_arrow(W * 0.30, H * 0.58 + 30, W * 0.52, H * 0.58 - 30, 'N:1\n(authors)')
    class_arrow(W * 0.30 + 30, H * 0.58 + 20, W * 0.68, H * 0.58 - 30, 'N:M\n(tags)')

    # Legend
    draw_label(ax, W * 0.06, H * 0.94, '<<model>> = SQLAlchemy ORM实体', 9, C['gray'], 'left')
    draw_label(ax, W * 0.06, H * 0.91, '<<service>> = 业务逻辑层服务', 9, C['gray'], 'left')

    save_image(fig, '10_系统核心类图.png')


# ═══════════════════════════════════════
# 14 用户账户状态图
# ═══════════════════════════════════════
def draw_state(ax, x, y, w, h, label, color, is_initial=False, is_final=False):
    if is_initial:
        ax.add_patch(Circle((x, y), 14, facecolor=C['dark'], edgecolor=C['dark'], lw=2))
        return
    if is_final:
        ax.add_patch(Circle((x, y), 16, facecolor='white', edgecolor=C['dark'], lw=2.5))
        ax.add_patch(Circle((x, y), 8, facecolor=C['dark'], edgecolor='none'))
        return
    box = FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                         boxstyle=f"round,pad=0,rounding_size=14",
                         facecolor=color, edgecolor=color, linewidth=2.5, alpha=0.13)
    ax.add_patch(box)
    bx = FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                        boxstyle=f"round,pad=0,rounding_size=14",
                        facecolor='none', edgecolor=color, linewidth=2.5)
    ax.add_patch(bx)
    for i, line in enumerate(label.split('\n')):
        ax.text(x, y + (len(label.split('\n')) / 2 - i - 0.5) * 16, line,
                ha='center', va='center', fontsize=12, color=color, fontweight='bold')


def state_trans(ax, x1, y1, x2, y2, label='', color=C['gray'], rad=0):
    dx, dy = x2 - x1, y2 - y1
    d = np.sqrt(dx * dx + dy * dy)
    if d < 1:
        return
    nx, ny = dx / d * 30, dy / d * 30
    draw_arrow(ax, x1 + nx, y1 + ny, x2 - nx, y2 - ny, color, lw=2.5, rad=rad)
    if label:
        mx, my = (x1 + x2) / 2 + 10, (y1 + y2) / 2 + 10
        draw_label(ax, mx, my, label, 9, bg=True)


def generate_state_user():
    fig, ax, W, H = new_figure(20, 11)
    ax.text(W / 2, H - 18, '用户账户状态图 (State Diagram)', ha='center',
            fontsize=22, fontweight='bold', color=C['dark'])

    # States — well spaced
    draw_state(ax, W * 0.08, H * 0.60, 0, 0, '', C['dark'], is_initial=True)
    visitor = (W * 0.22, H * 0.60, 180, 65, '未登录浏览者')
    registered = (W * 0.42, H * 0.60, 180, 65, '已注册\n未激活')
    logged_in = (W * 0.64, H * 0.60, 200, 70, '已登录\n活跃用户')
    disabled = (W * 0.42, H * 0.28, 180, 65, '已禁用\nis_active=False')
    final_s = (W * 0.88, H * 0.60, 0, 0, '')

    for sx, sy, sw, sh, label in [visitor, registered, logged_in, disabled]:
        draw_state(ax, sx, sy, sw, sh, label, C['primary'] if '已登录' in label
        else C['secondary'] if '注册' in label
        else C['red'] if '禁用' in label else C['gray'])
    draw_state(ax, *final_s, '', C['dark'], is_final=True)

    # Transitions
    state_trans(ax, W * 0.08 + 14, H * 0.60, visitor[0] - 90, visitor[1], '进入平台', C['dark'])
    state_trans(ax, visitor[0] + 90, visitor[1] + 15, registered[0] - 90,
                registered[1] + 15, '注册成功', C['secondary'])
    state_trans(ax, registered[0] + 90, registered[1], logged_in[0] - 100,
                logged_in[1], '登录验证通过\n(bcrypt + JWT)', C['primary'])
    state_trans(ax, logged_in[0] - 100, logged_in[1] - 20, visitor[0] + 90,
                visitor[1] - 20, '退出/Token失效', C['gray'])
    state_trans(ax, logged_in[0], logged_in[1] - 35, disabled[0] + 90,
                disabled[1] + 32, '管理员禁用', C['red'], 0.1)
    state_trans(ax, disabled[0] - 90, disabled[1] + 32, logged_in[0] - 90,
                logged_in[1] - 35, '管理员启用', C['primary'], -0.1)
    state_trans(ax, logged_in[0] + 100, logged_in[1], W * 0.88 - 16, H * 0.60,
                '注销账号', C['dark'])

    # Self-loops
    draw_arrow(ax, visitor[0] + 70, visitor[1] - 32, visitor[0] + 70, visitor[1] - 70,
               C['gray'], lw=1.5, rad=0.4)
    draw_label(ax, visitor[0] + 105, visitor[1] - 60, '浏览/搜索', 9, C['gray'])
    draw_arrow(ax, logged_in[0] + 72, logged_in[1] - 35, logged_in[0] + 72,
               logged_in[1] - 75, C['primary'], lw=1.5, rad=0.4)
    draw_label(ax, logged_in[0] + 112, logged_in[1] - 65, '阅读/评论/评分', 9, C['primary'])

    save_image(fig, '14_用户账户状态图.png')


# ═══════════════════════════════════════
# 15 图书生命周期状态图
# ═══════════════════════════════════════
def generate_state_book():
    fig, ax, W, H = new_figure(20, 11)
    ax.text(W / 2, H - 18, '图书生命周期状态图 (State Diagram)', ha='center',
            fontsize=22, fontweight='bold', color=C['dark'])

    states = [
        (W * 0.08, H * 0.55, True, False),  # initial
        (W * 0.24, H * 0.78, False, False),   # new
        (W * 0.48, H * 0.78, False, False),   # normal
        (W * 0.72, H * 0.78, False, False),   # hot
        (W * 0.48, H * 0.30, False, False),   # removed
        (W * 0.88, H * 0.55, False, True),    # final
    ]

    draw_state(ax, *states[0], '', C['dark'], is_initial=True)
    draw_state(ax, *states[5], '', C['dark'], is_final=True)

    new_s = (W * 0.24, H * 0.78, 170, 65, '新书上架\nis_new=True')
    normal_s = (W * 0.48, H * 0.78, 170, 65, '正常销售\n评分/评论累积')
    hot_s = (W * 0.72, H * 0.78, 170, 65, '热门图书\nhot_score>阈值')
    removed_s = (W * 0.48, H * 0.30, 170, 65, '已下架\nis_active=False')

    for sx, sy, sw, sh, label in [new_s, normal_s, hot_s, removed_s]:
        color = C['yellow'] if '新书' in label else C['secondary'] if '正常' in label \
            else C['accent'] if '热门' in label else C['red']
        draw_state(ax, sx, sy, sw, sh, label, color)

    # Transitions with longer arrows
    state_trans(ax, W * 0.08 + 14, H * 0.55, new_s[0] - 85, new_s[1],
                '管理员导入', C['dark'])
    state_trans(ax, new_s[0] + 85, new_s[1], normal_s[0] - 85, normal_s[1],
                '>30天自动转正', C['secondary'])
    state_trans(ax, normal_s[0] + 85, normal_s[1], hot_s[0] - 85, hot_s[1],
                '热度达标', C['accent'])
    state_trans(ax, hot_s[0] - 85, hot_s[1] - 20, normal_s[0] + 85, normal_s[1] - 20,
                '热度下降', C['secondary'])
    state_trans(ax, normal_s[0] - 40, normal_s[1] - 33, removed_s[0] + 40,
                removed_s[1] + 33, '管理员下架', C['red'], -0.12)
    state_trans(ax, new_s[0] - 85, new_s[1] - 25, removed_s[0] - 85,
                removed_s[1] + 25, '违规下架', C['red'])
    state_trans(ax, removed_s[0] + 85, removed_s[1], W * 0.88 - 16, H * 0.55,
                '永久删除', C['dark'])

    # Self-loop
    draw_arrow(ax, normal_s[0] + 65, normal_s[1] - 33, normal_s[0] + 65,
               normal_s[1] - 75, C['secondary'], lw=1.5, rad=0.4)
    draw_label(ax, normal_s[0] + 105, normal_s[1] - 65, '阅读/收藏/评论', 9, C['secondary'])

    draw_label(ax, W * 0.50, H * 0.12, '[注] hot_score = α×阅读量 + β×评分 + γ×评论数',
               10, C['gray'])

    save_image(fig, '15_图书生命周期状态图.png')


# ═══════════════════════════════════════
# 活动图工具函数
# ═══════════════════════════════════════
def draw_act(ax, x, y, w, h, label, color):
    """活动节点"""
    ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                                 boxstyle="round,pad=0,rounding_size=10",
                                 facecolor=color, edgecolor=color, lw=2, alpha=0.18))
    ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                                 boxstyle="round,pad=0,rounding_size=10",
                                 facecolor='none', edgecolor=color, lw=2))
    for i, line in enumerate(label.split('\n')):
        ax.text(x, y + (len(label.split('\n')) / 2 - i - 0.5) * 14, line,
                ha='center', va='center', fontsize=10, color=C['text'])


def draw_decision(ax, x, y, s=28):
    """决策菱形"""
    ax.add_patch(Polygon([(x, y + s), (x + s * 1.4, y), (x, y - s),
                           (x - s * 1.4, y)],
                          facecolor=C['yellow_light'], edgecolor=C['yellow'], lw=2.5))


def act_flow(ax, x1, y1, x2, y2, label='', color=C['gray']):
    """活动流转箭头"""
    dx, dy = x2 - x1, y2 - y1
    d = np.sqrt(dx * dx + dy * dy)
    if d < 1:
        return
    nx, ny = dx / d * 25, dy / d * 25
    draw_arrow(ax, x1 + nx, y1 + ny, x2 - nx, y2 - ny, color, lw=2)
    if label:
        mx, my = (x1 + x2) / 2 + 8, (y1 + y2) / 2 + 8
        draw_label(ax, mx, my, label, 9, bg=True)


# ═══════════════════════════════════════
# 16 推荐引擎活动图
# ═══════════════════════════════════════
def generate_activity_recommend():
    fig, ax, W, H = new_figure(22, 18)
    ax.text(W / 2, H - 15, '推荐引擎活动图 (Activity Diagram)', ha='center',
            fontsize=22, fontweight='bold', color=C['dark'])

    # Start
    ax.add_patch(Circle((W * 0.50, H * 0.96), 16, facecolor=C['dark'], edgecolor=C['dark'], lw=2))

    # Main flow nodes
    nodes = [
        ('n1', W * 0.50, H * 0.90, 220, 50, '接收推荐请求\nGET /recommend/home', C['primary']),
        ('n2', W * 0.50, H * 0.83, 190, 45, '验证JWT Token', C['primary_dark']),
        ('n3', W * 0.50, H * 0.75, 200, 45, '获取用户画像\nGET /user/profile', C['primary']),
        # Fork
        ('n4a', W * 0.18, H * 0.60, 200, 55, 'KG图谱推荐\n(40%)\nNeo4j路径推理', C['teal']),
        ('n4b', W * 0.38, H * 0.60, 200, 55, 'CF协同过滤\n(40%)\n余弦相似度计算', C['secondary']),
        ('n4c', W * 0.62, H * 0.60, 200, 55, '热门推荐\n(10%)\nhot_score排序', C['accent']),
        ('n4d', W * 0.86, H * 0.60, 200, 55, '新书推荐\n(10%)\nis_new排序', C['purple']),
        # Join
        ('n5', W * 0.50, H * 0.44, 240, 50, '加权融合 (JOIN)\n∑ score × weight', C['dark']),
        ('n6', W * 0.50, H * 0.34, 200, 45, '去重+排序\n取Top-N(默认20)', C['primary']),
        ('n7', W * 0.50, H * 0.24, 200, 45, '生成推荐理由\n(8种模板匹配)', C['secondary']),
        ('n8', W * 0.50, H * 0.14, 200, 45, '返回JSON结果', C['red']),
    ]

    for key, x, y, w, h, label, color in nodes:
        draw_act(ax, x, y, w, h, label, color)

    # Decision node
    draw_decision(ax, W * 0.50, H * 0.69, 25)

    # Flows
    act_flow(ax, W * 0.50, H * 0.95, W * 0.50, H * 0.925)
    act_flow(ax, W * 0.50, H * 0.875, W * 0.50, H * 0.855)
    act_flow(ax, W * 0.50, H * 0.805, W * 0.50, H * 0.775)

    # Decision → yes
    act_flow(ax, W * 0.50 + 25, H * 0.69, W * 0.50, H * 0.75 - 25, '已登录')
    # Decision → no
    act_flow(ax, W * 0.50 - 25, H * 0.69, W * 0.25, H * 0.83, '未登录\n→热门推荐', C['red'])

    # n3 → fork branch
    act_flow(ax, W * 0.50, H * 0.725, W * 0.50, H * 0.675)
    # Fork → 4 branches
    for tx in [0.18, 0.38, 0.62, 0.86]:
        act_flow(ax, W * 0.50, H * 0.65, W * tx, H * 0.625)
    # 4 branches → Join
    for tx in [0.18, 0.38, 0.62, 0.86]:
        act_flow(ax, W * tx, H * 0.565, W * 0.50, H * 0.465)

    act_flow(ax, W * 0.50, H * 0.415, W * 0.50, H * 0.365)
    act_flow(ax, W * 0.50, H * 0.315, W * 0.50, H * 0.265)
    act_flow(ax, W * 0.50, H * 0.215, W * 0.50, H * 0.165)

    # End
    ax.add_patch(Circle((W * 0.50, H * 0.08), 16, facecolor='white', edgecolor=C['dark'], lw=2.5))
    ax.add_patch(Circle((W * 0.50, H * 0.08), 8, facecolor=C['dark'], edgecolor='none'))

    draw_label(ax, W * 0.06, H * 0.60, '[并行执行]\n提高响应速度', 9, C['gray'], 'center')
    draw_label(ax, W * 0.06, H * 0.83, '[降级]\n超时→缓存\n异常→热门', 9, C['red'], 'center')

    save_image(fig, '16_推荐引擎活动图.png')


# ═══════════════════════════════════════
# 17 用户评论活动图
# ═══════════════════════════════════════
def generate_activity_comment():
    fig, ax, W, H = new_figure(20, 16)
    ax.text(W / 2, H - 15, '用户评论活动图 (Activity Diagram)', ha='center',
            fontsize=22, fontweight='bold', color=C['dark'])

    ax.add_patch(Circle((W * 0.50, H * 0.96), 16, facecolor=C['dark'], edgecolor=C['dark'], lw=2))

    acts = [
        ('c1', W * 0.50, H * 0.90, 220, 48, '进入图书详情页\n打开评论区', C['primary']),
        ('c2', W * 0.50, H * 0.82, 200, 48, '输入评论内容\n(Markdown格式)', C['primary_dark']),
        ('c3', W * 0.50, H * 0.74, 180, 48, '选择星级评分\n(1-5星)', C['primary_dark']),
        ('c4', W * 0.50, H * 0.66, 180, 48, '点击"发布"按钮', C['primary']),
        ('c5o', W * 0.82, H * 0.58, 170, 48, '返回401\n"请先登录"', C['red']),
        ('c6', W * 0.50, H * 0.58, 200, 48, '前端验证\n内容非空且≤2000字', C['secondary']),
        ('c7o', W * 0.18, H * 0.58, 170, 48, '提示:\n请输入评论内容', C['red']),
        ('c8', W * 0.50, H * 0.48, 210, 48, 'POST /ecosystem/comments\n发送至后端', C['teal']),
        ('c9', W * 0.50, H * 0.38, 210, 48, '服务端写入MySQL\nbook_comments表', C['teal']),
        ('c10', W * 0.50, H * 0.28, 220, 48, '更新图书平均评分\nUPDATE books SET avg_rating', C['secondary']),
        ('c11', W * 0.50, H * 0.18, 210, 48, '返回201 Created\n评论区即时刷新', C['primary']),
    ]

    for key, x, y, w, h, label, color in acts:
        draw_act(ax, x, y, w, h, label, color)

    # Decision nodes
    draw_decision(ax, W * 0.50, H * 0.62, 22)
    draw_decision(ax, W * 0.50, H * 0.54, 22)

    # Flows
    act_flow(ax, W * 0.50, H * 0.955, W * 0.50, H * 0.925)
    act_flow(ax, W * 0.50, H * 0.875, W * 0.50, H * 0.845)
    act_flow(ax, W * 0.50, H * 0.795, W * 0.50, H * 0.765)
    act_flow(ax, W * 0.50, H * 0.735, W * 0.50, H * 0.685)

    # Decision d1: 已登录?
    draw_decision(ax, W * 0.50, H * 0.625, 0)  # actually check near c4
    act_flow(ax, W * 0.50, H * 0.645, W * 0.50, H * 0.625)
    act_flow(ax, W * 0.50 + 25, H * 0.625, W * 0.82 - 85, H * 0.58 + 24, 'YES', C['secondary'])
    act_flow(ax, W * 0.50 - 25, H * 0.625, W * 0.82, H * 0.625, 'NO→401', C['red'])

    # Decision d2: 验证通过?
    act_flow(ax, W * 0.82, H * 0.555, W * 0.50 + 80, H * 0.555)  # back to main
    act_flow(ax, W * 0.50 + 25, H * 0.54, W * 0.50 + 25, H * 0.48 + 22, 'YES')
    act_flow(ax, W * 0.50 - 25, H * 0.54, W * 0.18, H * 0.58 + 24, '内容为空', C['red'])
    draw_arrow(ax, W * 0.18 + 85, H * 0.555, W * 0.30 + 40, H * 0.82 - 24, C['secondary'], lw=2, rad=0.2)
    draw_label(ax, W * 0.24, H * 0.68, '重新输入', 9, C['secondary'], bg=True)

    act_flow(ax, W * 0.50, H * 0.555, W * 0.50, H * 0.505)
    act_flow(ax, W * 0.50, H * 0.455, W * 0.50, H * 0.405)
    act_flow(ax, W * 0.50, H * 0.355, W * 0.50, H * 0.305)
    act_flow(ax, W * 0.50, H * 0.255, W * 0.50, H * 0.205)

    # End
    ax.add_patch(Circle((W * 0.50, H * 0.12), 16, facecolor='white', edgecolor=C['dark'], lw=2.5))
    ax.add_patch(Circle((W * 0.50, H * 0.12), 8, facecolor=C['dark'], edgecolor='none'))

    save_image(fig, '17_用户评论活动图.png')


# ═══════════════════════════════════════
# 18 系统组件图
# ═══════════════════════════════════════
def generate_component_diagram():
    fig, ax, W, H = new_figure(24, 14)
    ax.text(W / 2, H - 18, '系统组件图 (Component Diagram)', ha='center',
            fontsize=22, fontweight='bold', color=C['dark'])

    def comp(ax, x, y, w, h, name, stereo, color, fs=11):
        """Component box with stereotype"""
        total_h = h + 16 if stereo else h
        ax.add_patch(FancyBboxPatch((x - w / 2, y - total_h / 2), w, total_h,
                                     boxstyle="round,pad=0,rounding_size=10",
                                     facecolor='white', edgecolor=color, lw=2.5))
        # Stereo
        if stereo:
            ax.text(x, y + total_h / 2 - 12, f'<<{stereo}>>', ha='center',
                    va='center', fontsize=7.5, color=color, fontweight='bold')
        # Component icon (small rectangles on left)
        ax.add_patch(Rectangle((x - w / 2 + 8, y - 6), 12, 5, facecolor=color, lw=0))
        ax.add_patch(Rectangle((x - w / 2 + 8, y - 16), 12, 5, facecolor=color, lw=0))
        ax.text(x + 8, y - 6, name, ha='center', va='center', fontsize=fs,
                fontweight='bold', color=C['dark'])

    # ── Frontend (top) ──
    comp(ax, W * 0.14, H * 0.85, 180, 55, 'uni-app Frontend', 'presentation', C['primary'])
    comp(ax, W * 0.14, H * 0.72, 180, 45, 'Static HTML (dev)', 'presentation', C['primary_dark'], 10)
    comp(ax, W * 0.14, H * 0.60, 150, 40, 'ChatWidget', 'component', C['primary_dark'], 9)

    # ── Nginx ──
    comp(ax, W * 0.40, H * 0.85, 180, 50, 'Nginx Reverse Proxy', 'reverse-proxy', C['secondary'])
    comp(ax, W * 0.40, H * 0.72, 180, 50, 'Static File Server', 'web-server', C['secondary'], 10)

    # ── FastAPI ──
    comp(ax, W * 0.50, H * 0.85, 190, 55, 'FastAPI Application', 'application', C['teal'])
    comp(ax, W * 0.50, H * 0.72, 170, 45, 'Swagger /docs', 'documentation', C['teal'], 10)

    # ── Chat API (shared across modules) ──
    comp(ax, W * 0.78, H * 0.85, 230, 55, 'Chat API /chat/send', 'ai-interface', C['purple'])
    comp(ax, W * 0.78, H * 0.72, 230, 45, 'IntentRouter → 分发至4模块', 'ai-interface', C['purple'], 9)

    # ── Service modules (middle) ──
    svc_y = H * 0.42
    services = [
        ('UserService\n用户画像(模块一)\n[个人阅读问答]', W * 0.12, C['primary']),
        ('GraphService\n知识图谱(模块二)\n[图书查询+图谱辅助]', W * 0.30, C['teal']),
        ('RecommendService\n推荐引擎(模块三)\n[自然语言荐书]', W * 0.48, C['accent']),
        ('EcosystemService\n阅读生态(模块四)\n[功能帮助+管理指引]', W * 0.66, C['secondary']),
    ]
    for name, sx, color in services:
        comp(ax, sx, svc_y, 190, 58, name, 'service', color, 8.5)
    svc_names = [n.split('\n')[0] for n, _, _ in services]

    # ── Data layer (bottom) ──
    data_y = H * 0.20
    data_items = [
        ('MySQL 8.0\n(database)', W * 0.12, C['teal']),
        ('Neo4j 5.x\n(graph-db)', W * 0.28, C['pink']),
        ('Redis 7+\n(cache)', W * 0.44, C['red']),
        ('ElasticSearch\n(search)', W * 0.60, C['yellow']),
        ('LLM API\n(ai-service)', W * 0.76, C['purple']),
    ]
    for name, dx, color in data_items:
        comp(ax, dx, data_y, 150, 45, name, 'storage', color, 9)

    # ── Connection arrows between layers ──
    # Frontend → Nginx
    draw_arrow(ax, W * 0.14 + 90, H * 0.82, W * 0.40 - 90, H * 0.85, C['gray'], 2)
    # Nginx → FastAPI + Chat API
    draw_arrow(ax, W * 0.40 + 90, H * 0.85, W * 0.50 - 95, H * 0.85, C['gray'], 2)
    draw_arrow(ax, W * 0.40 + 90, H * 0.82, W * 0.78 - 115, H * 0.82, C['purple'], 1.5, rad=0.05)
    # Chat API → IntentRouter distributes to 4 modules
    for ix in [0.12, 0.30, 0.48, 0.66]:
        draw_arrow(ax, W * 0.78, H * 0.80, W * ix, H * 0.44 + 25, C['purple'], 1.2, rad=0.02)
    # FastAPI → Services (route dispatch)
    for ix in [0.12, 0.30, 0.48, 0.66]:
        draw_arrow(ax, W * 0.50, H * 0.80, W * ix, H * 0.44 + 30, C['gray'], 1.2, rad=-0.02)
    # Services → Data (dashed)
    for sx in [0.12, 0.30, 0.48, 0.66]:
        for dx in [0.12, 0.28, 0.44, 0.60, 0.76]:
            ax.plot([sx, dx], [svc_y - 29, data_y + 23],
                    '--', color=C['light_gray'], linewidth=0.6, alpha=0.5)

    draw_label(ax, W / 2, H * 0.06, '← REST API (JSON/HTTP) →   ← Cypher (Bolt) →   ← Redis Protocol →',
               10, C['gray'])

    save_image(fig, '18_系统组件图.png')


# ═══════════════════════════════════════
# 19 模块间协作图
# ═══════════════════════════════════════
def generate_collaboration_diagram():
    fig, ax, W, H = new_figure(22, 14)
    ax.text(W / 2, H - 18, '模块间协作图 (Collaboration Diagram)', ha='center',
            fontsize=22, fontweight='bold', color=C['dark'])

    # 4 module boxes + AI cross-cutting annotation
    def mod_box(ax, x, y, w, h, title, items, color):
        ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                                     boxstyle="round,pad=0,rounding_size=14",
                                     facecolor='white', edgecolor=color, lw=3))
        ax.add_patch(FancyBboxPatch((x - w / 2, y + h / 2 - 32), w, 32,
                                     boxstyle="round,pad=0,rounding_size=14",
                                     facecolor=color, edgecolor=color, lw=0))
        ax.text(x, y + h / 2 - 16, title, ha='center', va='center',
                fontsize=11, fontweight='bold', color='white', zorder=6)
        for i, item in enumerate(items):
            ax.text(x - w / 2 + 14, y + h / 2 - 34 - i * 16, item, ha='left',
                    va='center', fontsize=8.5, color=C['text'])

    m1 = (W * 0.14, H * 0.52, 240, 230, '模块一: 用户画像 (A)',
          ['提供:', '· 用户注册/登录', '· JWT身份认证', '· 用户画像构建',
           '· 阅读行为记录', '', 'AI融入: 个人阅读问答',
           '接口:', 'GET /user/profile → 推荐', 'JWT Token → 全局认证'], C['primary'])
    m2 = (W * 0.42, H * 0.85, 250, 200, '模块二: 知识图谱 (B)',
          ['提供:', '· 图谱路径查询', '· 实体关系管理',
           '· 全文搜索', '', 'AI融入: 图书知识问答',
           '  + 图谱标签/关系辅助', '接口:', 'POST /graph/paths → 推荐'], C['teal'])
    m3 = (W * 0.42, H * 0.44, 250, 210, '模块三: 个性化推荐 (C)',
          ['提供:', '· KG推荐(40%)', '· CF推荐(40%)',
           '· 混合融合+排序', '· 推荐理由生成', '',
           'AI融入: 自然语言荐书', '接口:',
           'GET /recommend/home → 前端'], C['accent'])
    m4 = (W * 0.78, H * 0.38, 240, 200, '模块四: 阅读生态 (D)',
          ['提供:', '· 在线试读', '· 书评社区', '· 书架管理',
           '· 购书链接', '', 'AI融入: 功能问答+',
           '  管理员操作指引', '接口:', 'GET /ecosystem/*'], C['secondary'])

    for mx, my, mw, mh, title, items, color in [m1, m2, m3, m4]:
        mod_box(ax, mx, my, mw, mh, title, items, color)

    # Message arrows with labels
    def msg_arrow(x1, y1, x2, y2, label, color, rad=0):
        draw_arrow(ax, x1, y1, x2, y2, color, lw=2.5, rad=rad)
        draw_label(ax, (x1 + x2) / 2, (y1 + y2) / 2 + 15, label, 8, color,
                   bold=True, bg=True)

    # 1. 模块一 → 模块三
    msg_arrow(m1[0] + m1[2] / 2, m1[1] + 30, m3[0] - m3[2] / 2, m3[1] + 30,
              '1: GET /user/profile\n  → {tag_weights, high_rated_books}', C['primary'])
    # 2. 模块二 → 模块三
    msg_arrow(m2[0], m2[1] - m2[3] / 2, m3[0], m3[1] + m3[3] / 2,
              '2: POST /graph/paths\n  → {candidates, paths}', C['teal'])
    # 3. 模块三 → 前端 (via 模块四 display)
    msg_arrow(m3[0] - m3[2] / 2, m3[1] - 40, m4[0] + m4[2] / 2, m4[1] + 60,
              '3: GET /recommend/home\n  → {items, score, reason}', C['accent'], 0.1)
    # 4. Chat API → all modules (intent routing)
    chat_center_x = W * 0.78
    chat_center_y = H * 0.78
    # Draw a shared AI interaction box
    ax.add_patch(FancyBboxPatch((chat_center_x - 95, chat_center_y - 20), 190, 40,
                                 boxstyle="round,pad=0,rounding_size=12",
                                 facecolor=C['purple_light'], edgecolor=C['purple'], lw=2))
    ax.text(chat_center_x, chat_center_y, 'Chat API (跨模块共用)\n意图识别 → 按需分发', ha='center',
            va='center', fontsize=9, color=C['purple'], fontweight='bold')

    # Arrows from Chat API to each module
    for mx, my, color in [(m1[0], m1[1] + m1[3]/2, C['primary']),
                            (m2[0], m2[1] - m2[3]/2, C['teal']),
                            (m3[0] + m3[2]/2, m3[1] + m3[3]/2 - 30, C['accent']),
                            (m4[0] - m4[2]/2, m4[1] + m4[3]/2, C['secondary'])]:
        draw_arrow(ax, chat_center_x, chat_center_y - 20, mx, my, C['purple'], lw=1.5, rad=0.05)

    # Legend
    legend_items = [
        ('模块一(画像)→模块三(推荐)', C['primary']),
        ('模块二(图谱)→模块三(推荐)', C['teal']),
        ('模块三(推荐)→展示层', C['accent']),
        ('Chat API→各模块(意图分发)', C['purple']),
    ]
    for i, (label, color) in enumerate(legend_items):
        draw_label(ax, W * 0.06, H * 0.94 - i * 18, f'●  {label}', 9, color, 'left')

    draw_label(ax, W * 0.50, H * 0.05, '[注] 接口契约由 app/schemas/ 目录下的 Pydantic 模型精确定义',
               10, C['gray'])

    save_image(fig, '19_模块间协作图.png')


# ═══════════════════════════════════════
# 20 推荐系统数据流图 (DFD)
# ═══════════════════════════════════════
def generate_dataflow_diagram():
    fig, ax, W, H = new_figure(24, 15)
    ax.text(W / 2, H - 18, '推荐系统数据流图 (DFD Level 0)', ha='center',
            fontsize=20, fontweight='bold', color=C['dark'])

    def ext_entity(ax, x, y, w, h, label, color):
        ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                                     boxstyle="round,pad=0,rounding_size=6",
                                     facecolor='white', edgecolor=color, lw=2.5))
        ax.text(x, y, label, ha='center', va='center', fontsize=11,
                fontweight='bold', color=color)

    def process_box(ax, x, y, w, h, num, label, color):
        ax.add_patch(Circle((x - w / 2 + 22, y), 16, facecolor=color, edgecolor=color, lw=0))
        ax.text(x - w / 2 + 22, y, str(num), ha='center', va='center',
                fontsize=10, fontweight='bold', color='white', zorder=5)
        ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                                     boxstyle="round,pad=0,rounding_size=10",
                                     facecolor=color, edgecolor=color, lw=2, alpha=0.12))
        ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w, h,
                                     boxstyle="round,pad=0,rounding_size=10",
                                     facecolor='none', edgecolor=color, lw=2))
        for i, line in enumerate(label.split('\n')):
            ax.text(x + 24, y + (len(label.split('\n')) / 2 - i - 0.5) * 13,
                    line, ha='left', va='center', fontsize=9.5, color=C['text'])

    ds_count = [0]

    def data_store(ax, x, y, w, h, label, color):
        ds_count[0] += 1
        ax.add_patch(FancyBboxPatch((x - w / 2, y - h / 2), w - 8, h,
                                     boxstyle="round,pad=0,rounding_size=3",
                                     facecolor='white', edgecolor=color, lw=2))
        ax.plot([x + w / 2 - 8, x + w / 2 - 8], [y - h / 2, y + h / 2],
                color=color, lw=2)
        ax.text(x - 4, y, f'D{ds_count[0]}| {label}', ha='center', va='center',
                fontsize=9, color=C['dark'])

    # External entities
    ext_entity(ax, W * 0.08, H * 0.88, 160, 55, '用户 (User)', C['dark'])
    ext_entity(ax, W * 0.08, H * 0.22, 160, 55, '管理员 (Admin)', C['dark'])
    ext_entity(ax, W * 0.92, H * 0.88, 140, 55, '第三方购书平台', C['pink'])

    # Processes
    process_box(ax, W * 0.44, H * 0.88, 300, 68, 1,
                '用户认证与画像构建\n(UserService.register/login/build_profile)', C['primary'])
    process_box(ax, W * 0.44, H * 0.68, 300, 68, 2,
                '知识图谱查询与管理\n(GraphService.find_paths/get_subgraph)', C['teal'])
    process_box(ax, W * 0.44, H * 0.48, 300, 68, 3,
                '个性化推荐引擎\n(RecommendService.recommend_hybrid)', C['accent'])
    process_box(ax, W * 0.44, H * 0.28, 300, 68, 4,
                '阅读生态服务\n(EcosystemService: 试读/评论/书架/购书)', C['secondary'])

    # Data stores
    data_store(ax, W * 0.84, H * 0.68, 180, 50, 'MySQL 8.0', C['purple'])
    data_store(ax, W * 0.84, H * 0.48, 180, 50, 'Neo4j 5.x', C['teal'])
    data_store(ax, W * 0.84, H * 0.28, 180, 50, 'Redis 7+', C['red'])
    data_store(ax, W * 0.84, H * 0.08, 180, 50, 'ElasticSearch', C['yellow'])

    # Data flow arrows
    flows = [
        # User → P1
        (W * 0.08, H * 0.85, W * 0.44 - 150, H * 0.88 + 30, '注册/登录/行为', C['primary']),
        # P1 → D1
        (W * 0.44 + 150, H * 0.88, W * 0.84 - 90, H * 0.68 + 25, '用户数据', C['purple']),
        # P2 → D2
        (W * 0.44 + 150, H * 0.68, W * 0.84 - 90, H * 0.48 + 25, '图谱查询', C['teal']),
        # P3 → D1, D3
        (W * 0.44 + 150, H * 0.48 + 10, W * 0.84 - 90, H * 0.68 - 10, '评分/阅读数据', C['purple']),
        (W * 0.44 + 150, H * 0.48, W * 0.84 - 90, H * 0.28 + 25, '推荐缓存', C['red']),
        # P4 → D1, D4
        (W * 0.44 + 150, H * 0.28 + 10, W * 0.84 - 90, H * 0.68 - 25, '评论/书架', C['purple']),
        (W * 0.44 + 150, H * 0.28, W * 0.84 - 90, H * 0.08 + 25, '搜索关键词', C['yellow']),
        # Admin → P2, P4
        (W * 0.08, H * 0.24, W * 0.44 - 150, H * 0.68 - 20, '管理图谱', C['dark']),
        (W * 0.08, H * 0.24, W * 0.44 - 150, H * 0.28 + 20, '管理评论/购书', C['dark']),
        # P3 → User
        (W * 0.44 - 150, H * 0.48, W * 0.08 + 80, H * 0.85, '推荐结果+理由', C['accent']),
        # P4 → User
        (W * 0.44 - 150, H * 0.28, W * 0.08 + 80, H * 0.82, '试读/评论/书架', C['secondary']),
        # P4 → external
        (W * 0.44 + 150, H * 0.28, W * 0.92 - 70, H * 0.88, '购书跳转', C['pink']),
    ]
    for x1, y1, x2, y2, label, color in flows:
        draw_arrow(ax, x1, y1, x2, y2, color, lw=1.8)
        draw_label(ax, (x1 + x2) / 2 + 10, (y1 + y2) / 2 + 10, label, 8, color, bg=True)

    save_image(fig, '20_推荐系统数据流图.png')


# ═══════════════════════════════════════
# 22 智能问答活动图
# ═══════════════════════════════════════
def generate_activity_ai_chat():
    fig, ax, W, H = new_figure(22, 18)
    ax.text(W / 2, H - 15, '智能问答助手活动图 (Activity Diagram)', ha='center',
            fontsize=22, fontweight='bold', color=C['dark'])

    ax.add_patch(Circle((W * 0.50, H * 0.97), 16, facecolor=C['dark'], edgecolor=C['dark'], lw=2))

    acts = [
        ('a1', W * 0.50, H * 0.91, 220, 48, '用户输入自然语言消息', C['primary']),
        ('a2', W * 0.50, H * 0.84, 200, 48, 'JWT身份识别\n(匿名/用户/管理员)', C['primary_dark']),
        ('a3', W * 0.50, H * 0.70, 200, 48, 'LLM意图识别\n(6种意图分类)', C['teal']),
        # 6 branches
        ('a4a', W * 0.10, H * 0.56, 175, 55, '功能问答\n查询功能文档', C['primary']),
        ('a4b', W * 0.26, H * 0.56, 175, 55, '自然语言荐书\n提取条件/调用推荐', C['accent']),
        ('a4c', W * 0.42, H * 0.56, 175, 55, '图书知识问答\n检索DB/图谱', C['teal']),
        ('a4d', W * 0.58, H * 0.56, 175, 55, '个人阅读问答\n查询用户数据', C['secondary']),
        ('a4e', W * 0.74, H * 0.56, 175, 55, '管理员帮助\n查询后台指引', C['purple']),
        ('a4f', W * 0.90, H * 0.56, 175, 55, '超出范围\nOUT_OF_SCOPE', C['red']),
        # Out-of-scope path
        ('a5', W * 0.90, H * 0.46, 175, 48, '返回边界提示\n引导重新提问', C['red']),
        # Main path continues
        ('a6', W * 0.50, H * 0.44, 220, 48, '检索系统上下文\n(MySQL/Neo4j/Redis)', C['secondary']),
        ('a7', W * 0.50, H * 0.35, 220, 48, '组装System Prompt\n+ 上下文 + 对话历史', C['teal']),
        ('a8', W * 0.50, H * 0.26, 210, 48, 'LLM生成回答\n+ 建议追问', C['accent']),
        ('a9', W * 0.50, H * 0.17, 210, 48, '保存至MySQL\nchat_history表', C['primary']),
        ('a10', W * 0.50, H * 0.08, 210, 48, '返回ChatResponse', C['purple']),
    ]

    for key, x, y, w, h, label, color in acts:
        draw_act(ax, x, y, w, h, label, color)

    # Decisions
    draw_decision(ax, W * 0.50, H * 0.77, 24)
    draw_decision(ax, W * 0.50, H * 0.63, 24)

    # Flows
    act_flow(ax, W * 0.50, H * 0.965, W * 0.50, H * 0.935)
    act_flow(ax, W * 0.50, H * 0.885, W * 0.50, H * 0.865)
    act_flow(ax, W * 0.50, H * 0.815, W * 0.50, H * 0.79)

    # Boundary decision
    act_flow(ax, W * 0.50 + 24, H * 0.77, W * 0.50 + 24, H * 0.70 + 22, 'PASS')
    draw_arrow(ax, W * 0.50 - 30, H * 0.77 - 10, W * 0.90 - 85, H * 0.625 + 25, C['red'], lw=2, rad=-0.2)
    draw_label(ax, W * 0.72, H * 0.73, 'OUT OF SCOPE', 9, C['red'], bold=True, bg=True)

    # Intent decision → 6 branches
    for tx in [0.10, 0.26, 0.42, 0.58, 0.74, 0.90]:
        act_flow(ax, W * 0.50, H * 0.63, W * tx, H * 0.585, '', C['gray'])

    # Merge back (except out_of_scope)
    for tx in [0.10, 0.26, 0.42, 0.58, 0.74]:
        act_flow(ax, W * tx, H * 0.525, W * 0.50, H * 0.465)

    # Out-of-scope: return to input
    act_flow(ax, W * 0.90, H * 0.435, W * 0.50, H * 0.465 + 20, '重新提问', C['red'])

    act_flow(ax, W * 0.50, H * 0.415, W * 0.50, H * 0.375)
    act_flow(ax, W * 0.50, H * 0.325, W * 0.50, H * 0.285)
    act_flow(ax, W * 0.50, H * 0.235, W * 0.50, H * 0.195)
    act_flow(ax, W * 0.50, H * 0.145, W * 0.50, H * 0.105)

    # End
    ax.add_patch(Circle((W * 0.50, H * 0.035), 16, facecolor='white', edgecolor=C['dark'], lw=2.5))
    ax.add_patch(Circle((W * 0.50, H * 0.035), 8, facecolor=C['dark'], edgecolor='none'))

    draw_label(ax, W * 0.05, H * 0.70, '6种意图\n并行路由', 9, C['gray'], 'center')
    draw_label(ax, W * 0.05, H * 0.35, 'LLM调用\n(可降级为\n关键词匹配)', 9, C['gray'], 'center')

    save_image(fig, '22_智能问答活动图.png')


# ═══════════════════════════════════════
# 23 AI增强系统架构图
# ═══════════════════════════════════════
def generate_ai_architecture():
    fig, ax, W, H = new_figure(22, 14)
    ax.text(W / 2, H - 18, 'AI增强系统架构图', ha='center',
            fontsize=22, fontweight='bold', color=C['dark'])

    layers = [
        {
            'title': '前端展示层 (uni-app · Vue 3)',
            'color': C['primary'],
            'items': ['Web (H5)', 'Android App', 'iOS App', '微信小程序',
                      'ChatWidget\n智能助手悬浮'],
        },
        {
            'title': 'API网关 + AI交互层 (FastAPI + Nginx + LLM)',
            'color': C['purple'],
            'items': ['路由分发\nJWT认证', 'AI Chat API\nPOST /chat/send',
                      '意图识别\nLLM分类', '边界控制\n安全检查'],
        },
        {
            'title': '业务逻辑层 — 4大核心模块（各模块融入AI问答能力）',
            'color': C['teal'],
            'items': ['模块一\n用户画像\n[个人阅读问答]', '模块二\n知识图谱\n[图书查询+图谱辅助]',
                      '模块三\n推荐引擎\n[自然语言荐书]',
                      '模块四\n阅读生态\n[功能帮助]',
                      'Chat API\n跨模块分发\n[意图路由]'],
        },
        {
            'title': '数据存储层 (4种存储引擎 + LLM服务)',
            'color': C['accent'],
            'items': ['MySQL 8.0\n+chat_history', 'Neo4j 5.x\n知识图谱',
                      'Redis 7\n缓存', 'ElasticSearch\n全文搜索',
                      'LLM Service\n(OpenAI兼容)'],
        },
    ]

    lx, lw = 100, W - 200
    for i, layer in enumerate(layers):
        n_items = len(layer['items'])
        lh = 130
        ly = 30 + i * (lh + 18)
        # Background
        ax.add_patch(FancyBboxPatch((lx, ly), lw, lh,
                                     boxstyle="round,pad=0,rounding_size=14",
                                     facecolor=layer['color'], edgecolor=layer['color'],
                                     lw=0, alpha=0.08))
        # Title bar
        ax.add_patch(FancyBboxPatch((lx, ly + lh - 36), lw, 36,
                                     boxstyle="round,pad=0,rounding_size=14",
                                     facecolor=layer['color'], edgecolor=layer['color'],
                                     lw=0, alpha=0.95))
        ax.text(lx + lw / 2, ly + lh - 18, layer['title'], ha='center', va='center',
                fontsize=13, fontweight='bold', color='white', zorder=5)
        # Items
        item_w = (lw - 30) / n_items - 8
        for j, item in enumerate(layer['items']):
            ix = lx + 15 + j * (item_w + 8)
            iy = ly + 10
            ih = lh - 56
            is_new = '模块五' in item or 'ChatWidget' in item or 'AI' in item or 'LLM' in item or 'chat_history' in item
            ic = C['purple'] if is_new else layer['color']
            ax.add_patch(FancyBboxPatch((ix, iy), item_w, ih,
                                         boxstyle="round,pad=0,rounding_size=8",
                                         facecolor='white', edgecolor=ic,
                                         lw=2.5 if is_new else 1.5, alpha=0.95))
            lines = item.split('\n')
            for k, line in enumerate(lines):
                ax.text(ix + item_w / 2, iy + ih / 2 + (len(lines) / 2 - k - 0.5) * 14,
                        line, ha='center', va='center', fontsize=10,
                        color=ic, fontweight='bold' if is_new else 'normal')

    # Vertical arrows
    for i in range(3):
        ly1 = 30 + i * 148 + 130
        ly2 = 30 + (i + 1) * 148
        draw_arrow(ax, W / 2, ly1 + 10, W / 2, ly2 + 120, C['gray'], 2.5)

    # AI flow annotation
    ax.add_patch(FancyBboxPatch((W * 0.82, H * 0.52), 220, 240,
                                 boxstyle="round,pad=0,rounding_size=12",
                                 facecolor=C['purple_light'], edgecolor=C['purple'], lw=2))
    flow_text = 'AI 问答流程:\n\n1. 用户输入问题\n2. JWT身份识别\n3. LLM意图分类\n4. 按意图分发至对应模块:\n  个人→模块一\n  图书→模块二\n  荐书→模块三\n  功能→模块四\n5. 模块检索业务数据\n6. LLM生成回答\n7. 保存对话历史\n8. 返回+建议追问'
    ax.text(W * 0.82 + 110, H * 0.52 + 120, flow_text, ha='center', va='top',
            fontsize=8.5, color=C['purple'])

    save_image(fig, '23_AI增强系统架构图.png')


# ═══════════════════════════════════════
# 时序图 (保持不变，仅重新声明以便单独运行)
# ═══════════════════════════════════════
# 时序图的函数沿用原有实现，此处不再重复定义
# generate_sequence_recommend()  # 11
# generate_sequence_login()      # 12
# generate_sequence_comment()    # 13
# generate_sequence_ai_chat()    # 21

# ═══════════════════════════════════════
# Main
# ═══════════════════════════════════════
if __name__ == '__main__':
    print('=' * 60)
    print('重绘 11 张非时序图 (优化布局/箭头/字间距)')
    print('=' * 60)
    print()

    generate_er_diagram()           # 09
    generate_class_diagram()        # 10
    generate_state_user()           # 14
    generate_state_book()           # 15
    generate_activity_recommend()   # 16
    generate_activity_comment()     # 17
    generate_component_diagram()    # 18
    generate_collaboration_diagram()  # 19
    generate_dataflow_diagram()     # 20
    generate_activity_ai_chat()     # 22
    generate_ai_architecture()      # 23

    print()
    print(f'所有图表已生成至: {OUTPUT_DIR}/')
