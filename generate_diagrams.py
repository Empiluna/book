#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
重新生成《基于知识图谱的个性化荐书系统》需求说明书全部8张图片
特点：字迹大而清晰、箭头准确对齐、配色美观专业
"""

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Arc, Circle, Ellipse, Polygon
import matplotlib.patheffects as pe
import numpy as np
import os

# ============ 全局设置 ============
plt.rcParams['font.family'] = 'Microsoft YaHei'
plt.rcParams['font.size'] = 14
plt.rcParams['axes.unicode_minus'] = False

OUTPUT_DIR = 'temp_images_new'
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 统一颜色方案
C = {
    'primary': '#2563EB',      # 主蓝
    'primary_dark': '#1D4ED8',
    'secondary': '#059669',    # 绿
    'accent': '#EA580C',       # 橙
    'purple': '#7C3AED',
    'teal': '#0D9488',
    'red': '#DC2626',
    'pink': '#DB2777',
    'dark': '#1E293B',
    'gray': '#64748B',
    'light_gray': '#E2E8F0',
    'bg': '#F8FAFC',
    'white': '#FFFFFF',
    'text': '#1E293B',
    'blue_light': '#DBEAFE',
    'green_light': '#D1FAE5',
    'orange_light': '#FED7AA',
    'purple_light': '#EDE9FE',
    'teal_light': '#CCFBF1',
    'red_light': '#FEE2E2',
}


def new_figure(width=16, height=9, dpi=150):
    """创建新画布"""
    fig, ax = plt.subplots(figsize=(width, height), dpi=dpi)
    ax.set_xlim(0, width * 100)
    ax.set_ylim(0, height * 100)
    ax.set_aspect('equal')
    ax.axis('off')
    fig.patch.set_facecolor(C['white'])
    return fig, ax, width * 100, height * 100


def draw_box(ax, x, y, w, h, text, color=C['primary'], text_color='white',
             fontsize=16, fontweight='bold', radius=12, linewidth=2):
    """绘制圆角矩形框"""
    box = FancyBboxPatch((x - w/2, y - h/2), w, h,
                          boxstyle=f"round,pad=0,rounding_size={radius}",
                          facecolor=color, edgecolor=color, linewidth=linewidth, alpha=0.95)
    ax.add_patch(box)
    # Shadow effect
    shadow = FancyBboxPatch((x - w/2 + 3, y - h/2 - 3), w, h,
                             boxstyle=f"round,pad=0,rounding_size={radius}",
                             facecolor='#00000015', edgecolor='none', linewidth=0)
    ax.add_patch(shadow)
    ax.text(x, y, text, ha='center', va='center', color=text_color,
            fontsize=fontsize, fontweight=fontweight, zorder=5)
    return box


def draw_box_outline(ax, x, y, w, h, text, color=C['primary'], text_color=None,
                     fontsize=14, fontweight='normal', radius=12, linewidth=2.5):
    """绘制轮廓式矩形框"""
    if text_color is None:
        text_color = color
    box = FancyBboxPatch((x - w/2, y - h/2), w, h,
                          boxstyle=f"round,pad=0,rounding_size={radius}",
                          facecolor=C['white'], edgecolor=color, linewidth=linewidth)
    ax.add_patch(box)
    ax.text(x, y, text, ha='center', va='center', color=text_color,
            fontsize=fontsize, fontweight=fontweight, zorder=5)
    return box


def draw_arrow(ax, x1, y1, x2, y2, color=C['gray'], linewidth=2.5, style='->',
               connectionstyle='arc3,rad=0', zorder=1):
    """绘制箭头"""
    arrow = FancyArrowPatch((x1, y1), (x2, y2),
                             arrowstyle=style, color=color,
                             linewidth=linewidth,
                             connectionstyle=connectionstyle,
                             mutation_scale=20, zorder=zorder)
    ax.add_patch(arrow)
    return arrow


def draw_line(ax, x1, y1, x2, y2, color=C['gray'], linewidth=2, style='-'):
    """绘制直线/虚线"""
    ax.plot([x1, x2], [y1, y2], style, color=color, linewidth=linewidth, zorder=0)


def draw_actor(ax, x, y, label, size=60):
    """绘制火柴人actor"""
    head_r = size * 0.12
    body_h = size * 0.35
    # Head
    head = Circle((x, y + body_h + head_r * 6), head_r,
                  facecolor=C['dark'], edgecolor=C['dark'], linewidth=2, zorder=5)
    ax.add_patch(head)
    # Body
    ax.plot([x, x], [y + body_h, y + body_h + head_r * 6 - head_r],
            color=C['dark'], linewidth=2.5, zorder=5)
    # Arms
    ax.plot([x - size*0.18, x, x + size*0.18],
            [y + body_h + head_r * 4, y + body_h + head_r * 3.5, y + body_h + head_r * 4],
            color=C['dark'], linewidth=2, zorder=5)
    # Legs
    ax.plot([x, x - size*0.15], [y + body_h, y], color=C['dark'], linewidth=2, zorder=5)
    ax.plot([x, x + size*0.15], [y + body_h, y], color=C['dark'], linewidth=2, zorder=5)
    # Label
    if label:
        ax.text(x, y - 25, label, ha='center', va='top', fontsize=13,
                fontweight='bold', color=C['dark'], zorder=5)
    return head


def draw_use_case_bubble(ax, x, y, w, h, text, color=C['primary'], fontsize=13):
    """绘制用例椭圆气泡"""
    ellipse = FancyBboxPatch((x - w/2, y - h/2), w, h,
                              boxstyle="round,pad=0,rounding_size=40",
                              facecolor=C['white'], edgecolor=color,
                              linewidth=2.5, zorder=4)
    ax.add_patch(ellipse)
    ax.text(x, y, text, ha='center', va='center', fontsize=fontsize,
            color=C['text'], fontweight='normal', zorder=5)
    return ellipse


def draw_layer_box(ax, x, y, w, h, title, items, color=C['primary'],
                   title_color='white', fontsize=13):
    """绘制分层架构的大框（带标题和子项）"""
    # Main box
    box = FancyBboxPatch((x, y), w, h,
                          boxstyle=f"round,pad=0,rounding_size=10",
                          facecolor=color, edgecolor=color, linewidth=0, alpha=0.12)
    ax.add_patch(box)
    # Title bar
    title_bar = FancyBboxPatch((x, y + h - 45), w, 45,
                                boxstyle=f"round,pad=0,rounding_size=10",
                                facecolor=color, edgecolor=color, linewidth=0, alpha=0.95)
    ax.add_patch(title_bar)
    ax.text(x + w/2, y + h - 22, title, ha='center', va='center',
            fontsize=fontsize+2, fontweight='bold', color=title_color, zorder=5)
    # Items
    if items:
        n = len(items)
        item_w = (w - 40) / max(n, 1) - 10
        for i, item in enumerate(items):
            ix = x + 20 + i * (item_w + 10)
            iy = y + 15
            ih = h - 75
            item_box = FancyBboxPatch((ix, iy), item_w, ih,
                                       boxstyle=f"round,pad=0,rounding_size=8",
                                       facecolor=C['white'], edgecolor=color,
                                       linewidth=1.5, alpha=0.9, zorder=3)
            ax.add_patch(item_box)
            # Split item text into lines
            lines = item.split('\n')
            for j, line in enumerate(lines):
                ax.text(ix + item_w/2, iy + ih/2 + (len(lines)//2 - j) * 20,
                        line, ha='center', va='center', fontsize=fontsize-1,
                        color=C['text'], zorder=5)
    return box


def save_image(fig, name):
    """保存图片"""
    path = os.path.join(OUTPUT_DIR, name)
    fig.savefig(path, dpi=150, bbox_inches='tight', pad_inches=0.3,
                facecolor=C['white'], edgecolor='none')
    plt.close(fig)
    print(f'  [OK] {name} saved ({os.path.getsize(path)//1024} KB)')


# ============================================================
# 图1: 核心业务流程图 (图1-1)
# ============================================================
def generate_image1():
    fig, ax, W, H = new_figure(18, 7)

    # Title
    ax.text(W/2, H - 50, '核心业务流程图', ha='center', va='top',
            fontsize=26, fontweight='bold', color=C['dark'])

    # Flow boxes - horizontal layout
    boxes = [
        ('进入平台\n首页', C['primary']),
        ('浏览/搜索\n发现图书', C['secondary']),
        ('查看图书\n详情页', C['teal']),
        ('在线试读\n（前10页）', C['purple']),
        ('收藏/评论\n评分互动', C['accent']),
        ('个人中心\n阅读统计', C['pink']),
    ]

    box_w, box_h = 190, 100
    total_w = len(boxes) * box_w + (len(boxes) - 1) * 100
    start_x = W/2 - total_w/2 + box_w/2
    cy = H * 0.55

    positions = []
    for i, (text, color) in enumerate(boxes):
        bx = start_x + i * (box_w + 100)
        draw_box(ax, bx, cy, box_w, box_h, text, color=color, fontsize=15)
        positions.append((bx, cy, box_w, box_h))

    # Arrows between boxes
    for i in range(len(positions) - 1):
        x1 = positions[i][0] + positions[i][2]/2
        x2 = positions[i+1][0] - positions[i+1][2]/2
        draw_arrow(ax, x1, cy, x2, cy, color=C['gray'], linewidth=3)

    # Side flow: 注册/登录
    bx, by, bw, bh = start_x - box_w - 100, cy + 160, 170, 80
    draw_box(ax, bx, by, bw, bh, '注册/登录', color=C['primary_dark'], fontsize=14, radius=8)
    draw_arrow(ax, bx, by + bh/2, start_x, cy + box_h/2 + 30, color=C['gray'],
               linewidth=2, connectionstyle='arc3,rad=0.3')

    # Side flow: 一键购买
    bx3 = start_x + 2 * (box_w + 100)
    draw_box(ax, bx3, cy + 160, 170, 80, '一键购买\n跳转第三方', color=C['accent'], fontsize=13, radius=8)
    draw_arrow(ax, bx3, cy + box_h/2, bx3, cy + 80, color=C['gray'], linewidth=2.5,
               connectionstyle='arc3,rad=0.3')

    # Bottom labels
    ax.text(W/2, 40, '图1-1  核心业务流程图', ha='center', va='center',
            fontsize=16, color=C['gray'], style='italic')

    save_image(fig, 'image1_业务流程图.png')


# ============================================================
# 图2: 系统总体用例图 (图3-1)
# ============================================================
def generate_image2():
    fig, ax, W, H = new_figure(18, 10)

    ax.text(W/2, H - 40, '系统总体用例图', ha='center', va='top',
            fontsize=26, fontweight='bold', color=C['dark'])

    # System boundary box
    sys_x, sys_y = W * 0.32, H * 0.08
    sys_w, sys_h = W * 0.62, H * 0.78
    sys_box = FancyBboxPatch((sys_x, sys_y), sys_w, sys_h,
                              boxstyle="round,pad=0,rounding_size=20",
                              facecolor=C['bg'], edgecolor=C['light_gray'],
                              linewidth=2, linestyle='--')
    ax.add_patch(sys_box)
    ax.text(sys_x + sys_w/2, sys_y + sys_h - 20, '基于知识图谱的个性化荐书系统',
            ha='center', va='top', fontsize=15, fontweight='bold', color=C['gray'])

    # Actors on left
    actors = [
        ('普通用户\n(未登录)', W * 0.08, H * 0.72),
        ('普通用户\n(已登录)', W * 0.18, H * 0.48),
        ('管理员', W * 0.18, H * 0.22),
    ]
    for label, ax_x, ay in actors:
        draw_actor(ax, ax_x, ay, label, size=70)

    # Use cases - arranged inside system boundary
    use_cases = {
        # Top row - shared by all
        '浏览首页': (W * 0.52, H * 0.78, C['primary'], 150, 55),
        '搜索图书': (W * 0.52, H * 0.63, C['primary'], 150, 55),
        '查看图书详情': (W * 0.52, H * 0.48, C['primary'], 160, 55),
        '用户注册': (W * 0.38, H * 0.72, C['secondary'], 135, 50),
        '用户登录': (W * 0.38, H * 0.58, C['secondary'], 135, 50),
        # Middle - logged-in & admin
        '个性化推荐': (W * 0.72, H * 0.78, C['teal'], 145, 50),
        '在线试读': (W * 0.72, H * 0.63, C['teal'], 145, 50),
        '书架管理': (W * 0.72, H * 0.48, C['teal'], 145, 50),
        '发表评论/评分': (W * 0.88, H * 0.78, C['purple'], 155, 50),
        '一键购买': (W * 0.88, H * 0.63, C['purple'], 155, 50),
        '个人中心': (W * 0.88, H * 0.48, C['purple'], 155, 50),
        # Bottom - admin only
        '用户管理': (W * 0.50, H * 0.28, C['accent'], 135, 50),
        '图书管理': (W * 0.66, H * 0.28, C['accent'], 135, 50),
        '知识图谱管理': (W * 0.82, H * 0.28, C['accent'], 150, 50),
        '数据统计': (W * 0.50, H * 0.14, C['red'], 135, 50),
        '评论管理': (W * 0.66, H * 0.14, C['red'], 135, 50),
        '购买链接管理': (W * 0.82, H * 0.14, C['red'], 160, 50),
    }

    for label, (ux, uy, color, uw, uh) in use_cases.items():
        draw_use_case_bubble(ax, ux, uy, uw, uh, label, color=color, fontsize=12)

    # Connection lines from actors to use cases
    # 未登录 user
    ux, uy = W * 0.08, H * 0.72
    for tx, ty in [(W*0.38, H*0.72), (W*0.52, H*0.78), (W*0.52, H*0.63), (W*0.52, H*0.48)]:
        draw_line(ax, ux + 30, uy, tx - 75, ty, color=C['gray'], linewidth=1.5)

    # 已登录 user
    ux, uy = W * 0.18, H * 0.48
    for tx, ty in [(W*0.38, H*0.58), (W*0.72, H*0.78), (W*0.72, H*0.63),
                   (W*0.72, H*0.48), (W*0.88, H*0.78), (W*0.88, H*0.63), (W*0.88, H*0.48)]:
        draw_line(ax, ux + 30, uy, tx - 75, ty, color=C['gray'], linewidth=1.5)

    # Admin
    ux, uy = W * 0.18, H * 0.22
    for tx, ty in [(W*0.50, H*0.28), (W*0.66, H*0.28), (W*0.82, H*0.28),
                   (W*0.50, H*0.14), (W*0.66, H*0.14), (W*0.82, H*0.14),
                   (W*0.38, H*0.58)]:
        draw_line(ax, ux + 30, uy, tx - 75, ty, color=C['gray'], linewidth=1.5)

    ax.text(W/2, 25, '图3-1  系统总体用例图', ha='center', va='center',
            fontsize=16, color=C['gray'], style='italic')

    save_image(fig, 'image2_系统总体用例图.png')


# ============================================================
# 图3: 普通用户详细用例图 (图3-2)
# ============================================================
def generate_image3():
    fig, ax, W, H = new_figure(18, 10)

    ax.text(W/2, H - 35, '普通用户（已登录）详细用例图', ha='center', va='top',
            fontsize=26, fontweight='bold', color=C['dark'])

    # System boundary
    sys_x, sys_y = W * 0.28, H * 0.06
    sys_w, sys_h = W * 0.68, H * 0.80
    sys_box = FancyBboxPatch((sys_x, sys_y), sys_w, sys_h,
                              boxstyle="round,pad=0,rounding_size=20",
                              facecolor=C['bg'], edgecolor=C['light_gray'],
                              linewidth=2, linestyle='--')
    ax.add_patch(sys_box)
    ax.text(sys_x + sys_w/2, sys_y + sys_h - 15, '荐书系统 - 已登录用户功能',
            ha='center', va='top', fontsize=13, color=C['gray'])

    # Actor
    ax_x, ay = W * 0.12, H * 0.52
    draw_actor(ax, ax_x, ay, '普通用户\n(已登录)', size=70)

    # Use cases - organized layout
    ucs = [
        # (label, x, y, w, h, color)
        ('个性化推荐', W*0.48, H*0.82, 150, 52, C['primary']),
        ('在线试读', W*0.68, H*0.82, 130, 52, C['primary']),
        ('书架管理', W*0.48, H*0.65, 150, 52, C['secondary']),
        ('发表评论/评分', W*0.68, H*0.65, 155, 52, C['secondary']),
        ('评论点赞互动', W*0.88, H*0.65, 150, 52, C['teal']),
        ('一键购买', W*0.48, H*0.48, 150, 52, C['purple']),
        ('个人中心', W*0.68, H*0.48, 130, 52, C['purple']),
        ('阅读统计', W*0.88, H*0.48, 130, 52, C['accent']),
        # Include/extend sub-cases
        ('<<include>>\n用户登录验证', W*0.48, H*0.30, 170, 55, C['red']),
        ('<<extend>>\n推荐理由展示', W*0.72, H*0.30, 170, 55, C['pink']),
    ]

    positions = {}
    for label, ux, uy, uw, uh, color in ucs:
        draw_use_case_bubble(ax, ux, uy, uw, uh, label, color=color, fontsize=11)
        positions[label.split('\n')[-1] if '\n' in label else label] = (ux, uy, uw, uh)

    # Connection lines from actor
    for tc in ['个性化推荐', '在线试读', '书架管理', '发表评论/评分', '一键购买', '个人中心']:
        tx, ty, tw, th = positions[tc]
        draw_line(ax, ax_x + 30, ay, tx - tw/2, ty, color=C['gray'], linewidth=1.8)

    # <<include>> and <<extend>> connections
    # 个性化推荐 includes 推荐理由展示
    ux1, uy1, uw1, uh1 = positions['个性化推荐']
    ux2, uy2, uw2, uh2 = positions['推荐理由展示']
    draw_arrow(ax, ux1, uy1 - uh1/2, ux2, uy2 + uh2/2, color=C['gray'],
               linewidth=2, style='->')
    ax.text((ux1 + ux2)/2 + 15, (uy1 + uy2)/2, '<<extend>>', fontsize=10, color=C['gray'])

    # 发表评论/评分 includes 评论点赞互动
    ux1, uy1, uw1, uh1 = positions['发表评论/评分']
    ux2, uy2, uw2, uh2 = positions['评论点赞互动']
    draw_arrow(ax, ux1 + uw1/2, uy1, ux2 - uw2/2, uy2, color=C['gray'],
               linewidth=2, style='->')

    # 在线试读 includes 用户登录验证
    ux1, uy1, uw1, uh1 = positions['在线试读']
    ux2, uy2, uw2, uh2 = positions['用户登录验证']
    draw_arrow(ax, ux1, uy1 - uh1/2, ux2, uy2 + uh2/2, color=C['gray'],
               linewidth=2, style='->')
    ax.text((ux1 + ux2)/2 - 30, (uy1 + uy2)/2, '<<include>>', fontsize=10, color=C['gray'])

    ax.text(W/2, 20, '图3-2  普通用户（已登录）详细用例图', ha='center', va='center',
            fontsize=16, color=C['gray'], style='italic')

    save_image(fig, 'image3_普通用户详细用例图.png')


# ============================================================
# 图4: 管理员用例图 (图3-3)
# ============================================================
def generate_image4():
    fig, ax, W, H = new_figure(16, 9)

    ax.text(W/2, H - 40, '管理员用例图', ha='center', va='top',
            fontsize=26, fontweight='bold', color=C['dark'])

    # System boundary
    sys_x, sys_y = W * 0.30, H * 0.06
    sys_w, sys_h = W * 0.65, H * 0.80
    sys_box = FancyBboxPatch((sys_x, sys_y), sys_w, sys_h,
                              boxstyle="round,pad=0,rounding_size=20",
                              facecolor=C['bg'], edgecolor=C['light_gray'],
                              linewidth=2, linestyle='--')
    ax.add_patch(sys_box)
    ax.text(sys_x + sys_w/2, sys_y + sys_h - 15, '管理员后台系统',
            ha='center', va='top', fontsize=13, color=C['gray'])

    # Actor
    ax_x, ay = W * 0.10, H * 0.52
    draw_actor(ax, ax_x, ay, '管理员', size=75)

    # Admin use cases - center layout
    center_x, center_y = W * 0.55, H * 0.50

    # Central management use cases in a circle-like layout
    admin_ucs = [
        ('管理员登录', center_x - 80, H * 0.82, 160, 55, C['primary_dark']),
        ('用户管理', center_x - 220, H * 0.58, 155, 55, C['primary']),
        ('图书管理', center_x - 220, H * 0.30, 155, 55, C['secondary']),
        ('知识图谱管理', center_x + 80, H * 0.58, 170, 55, C['teal']),
        ('购买链接管理', center_x + 80, H * 0.30, 170, 55, C['purple']),
        ('评论管理', center_x - 60, H * 0.70, 155, 55, C['accent']),
        ('数据统计', center_x + 20, H * 0.18, 200, 55, C['red']),
    ]

    positions = {}
    for label, ux, uy, uw, uh, color in admin_ucs:
        draw_use_case_bubble(ax, ux, uy, uw, uh, label, color=color, fontsize=12)
        positions[label] = (ux, uy, uw, uh)

    # Connections from admin
    for label in admin_ucs:
        ux, uy, uw, uh = positions[label[0]]
        draw_line(ax, ax_x + 35, ay, ux - uw/2, uy, color=C['gray'], linewidth=1.8)

    ax.text(W/2, 20, '图3-3  管理员用例图', ha='center', va='center',
            fontsize=16, color=C['gray'], style='italic')

    save_image(fig, 'image4_管理员用例图.png')


# ============================================================
# 图5: 系统部署架构图 (图5-1)
# ============================================================
def generate_image5():
    fig, ax, W, H = new_figure(18, 10)

    ax.text(W/2, H - 35, '系统部署架构图', ha='center', va='top',
            fontsize=26, fontweight='bold', color=C['dark'])

    # Internet / Client layer
    cx, cy, cw, ch = 200, H*0.70, W - 400, 100
    draw_box(ax, W/2, cy + ch/2, cw, ch,
             '客户端  ·  Web (H5)  |  Android  |  iOS  |  微信小程序',
             color=C['dark'], fontsize=15, radius=10)
    ax.text(50, cy + ch/2, 'Internet', ha='center', va='center', fontsize=13,
            color=C['gray'], style='italic', rotation=0)

    # Nginx layer
    nx, ny, nw, nh = 300, H*0.50, W - 600, 90
    draw_box(ax, W/2, ny + nh/2, nw, nh,
             'Nginx 反向代理 + 静态资源服务  (端口 80/443)',
             color=C['secondary'], fontsize=15, radius=10)

    # Arrow from Client to Nginx
    draw_arrow(ax, W/2, cy, W/2, ny + nh, color=C['gray'], linewidth=3)

    # Docker Compose boundary
    dx, dy, dw, dh = 280, H*0.06, W - 560, H*0.38
    docker_box = FancyBboxPatch((dx, dy), dw, dh,
                                 boxstyle="round,pad=0,rounding_size=15",
                                 facecolor=C['blue_light'], edgecolor=C['primary'],
                                 linewidth=2.5, linestyle='-', alpha=0.3)
    ax.add_patch(docker_box)
    ax.text(dx + 20, dy + dh - 18, 'Docker Compose 容器编排', fontsize=13,
            fontweight='bold', color=C['primary_dark'])

    # Backend services
    services = [
        ('FastAPI\n(Uvicorn x4)', C['primary']),
        ('推荐引擎\n(scikit-learn)', C['purple']),
    ]
    svc_w, svc_h = 200, 100
    for i, (text, color) in enumerate(services):
        sx = dx + 180 + i * 280
        sy = dy + dh * 0.35
        draw_box(ax, sx, sy, svc_w, svc_h, text, color=color, fontsize=14, radius=10)

    # Data layer
    data_services = [
        ('MySQL 8.0\n(用户/图书数据)', C['accent']),
        ('Neo4j 5.x\n(知识图谱)', C['teal']),
        ('Redis 7+\n(缓存/Session)', C['red']),
        ('ElasticSearch\n(全文检索)', C['secondary']),
    ]
    for i, (text, color) in enumerate(data_services):
        sx = dx + 100 + i * 210
        sy = dy + 45
        draw_box(ax, sx, sy, 180, 80, text, color=color, fontsize=12, radius=10)

    # Connection arrows from Nginx to Backend
    for sx in [dx + 180, dx + 460]:
        draw_arrow(ax, W/2, ny, sx, dy + dh, color=C['gray'], linewidth=2, style='->')

    # Connection arrows from Backend to Data
    draw_arrow(ax, dx + 180, dy + dh*0.35 - svc_h/2, dx + 100, dy + 85,
               color=C['gray'], linewidth=1.8, style='->')
    draw_arrow(ax, dx + 180, dy + dh*0.35 - svc_h/2, dx + 310, dy + 85,
               color=C['gray'], linewidth=1.8, style='->')
    draw_arrow(ax, dx + 460, dy + dh*0.35 - svc_h/2, dx + 520, dy + 85,
               color=C['gray'], linewidth=1.8, style='->')
    draw_arrow(ax, dx + 460, dy + dh*0.35 - svc_h/2, dx + 730, dy + 85,
               color=C['gray'], linewidth=1.8, style='->')

    # Port labels
    ports = ['3306', '7474/7687', '6379', '9200']
    for i, port in enumerate(ports):
        sx = dx + 100 + i * 210
        ax.text(sx, dy + 20, f':{port}', ha='center', va='center',
                fontsize=10, color=C['gray'], style='italic')

    ax.text(W/2, 12, '图5-1  系统部署架构图', ha='center', va='center',
            fontsize=16, color=C['gray'], style='italic')

    save_image(fig, 'image5_系统部署架构图.png')


# ============================================================
# 图6: 系统功能架构图 (图5-2)
# ============================================================
def generate_image6():
    fig, ax, W, H = new_figure(18, 11)

    ax.text(W/2, H - 35, '系统功能架构图', ha='center', va='top',
            fontsize=26, fontweight='bold', color=C['dark'])

    # 4-layer architecture
    layers = [
        {
            'title': '前端展示层  (uni-app · Vue 3)',
            'color': C['primary'],
            'items': ['Web端\n(H5)', 'Android\nApp', 'iOS\nApp', '微信小程序'],
        },
        {
            'title': 'API 网关层  (FastAPI + Nginx)',
            'color': C['secondary'],
            'items': ['路由分发', 'JWT 认证\n鉴权', '限流控制', '日志记录\n与监控'],
        },
        {
            'title': '业务逻辑层  (4 大核心模块)',
            'color': C['teal'],
            'items': ['推荐引擎\n知识图谱+协同过滤\n热门+最新融合', '用户服务\n注册/登录/画像\n书架/阅读记录', '图书服务\n搜索/详情/分类\n购买链接管理', '社交服务\n评论/评分/点赞\n互动与管理'],
        },
        {
            'title': '数据存储层  (4 种存储引擎)',
            'color': C['purple'],
            'items': ['MySQL 8.0\n用户/图书\n评论/书架', 'Neo4j 5.x\n知识图谱\n实体关系网络', 'Redis 7+\n缓存/Session\n热门数据', 'ElasticSearch\n全文检索\n分词搜索'],
        },
    ]

    lx = 120
    lw = W - 240
    lh = (H - 130) / 4
    for i, layer in enumerate(layers):
        ly = 30 + i * lh
        # Small gap between layers
        ly = 30 + i * lh + i * 8
        draw_layer_box(ax, lx, ly, lw, lh - 8, layer['title'],
                       layer['items'], color=layer['color'], fontsize=13)

    # Vertical arrows between layers
    for i in range(3):
        ly1 = 30 + i * lh + i * 8 + lh - 8
        ly2 = 30 + (i+1) * lh + (i+1) * 8 + lh - 8
        draw_arrow(ax, W/2, ly1 + 20, W/2, ly2 - lh + 60,
                   color=C['gray'], linewidth=2.5, style='->')

    # Side labels
    side_labels = [
        ('uni-app\n跨平台', 60, H/2),
        ('Nginx + Uvicorn', W - 60, H/2),
    ]
    for text, sx, sy in side_labels:
        ax.text(sx, sy, text, ha='center', va='center', fontsize=11,
                color=C['gray'], rotation=90, style='italic')

    ax.text(W/2, 12, '图5-2  系统功能架构图', ha='center', va='center',
            fontsize=16, color=C['gray'], style='italic')

    save_image(fig, 'image6_系统功能架构图.png')


# ============================================================
# 图7: 知识图谱实体关系模型图 (附图1)
# ============================================================
def generate_image7():
    fig, ax, W, H = new_figure(18, 10)

    ax.text(W/2, H - 35, '知识图谱实体关系模型', ha='center', va='top',
            fontsize=26, fontweight='bold', color=C['dark'])

    # Entity nodes - center node is Book
    entities = {
        'Book\n图书': (W/2, H*0.52, 160, 100, C['primary']),           # center
        'Author\n作者': (W*0.23, H*0.52, 160, 100, C['secondary']),    # left
        'Publisher\n出版社': (W*0.77, H*0.52, 160, 100, C['teal']),    # right
        'Tag\n标签': (W*0.42, H*0.82, 140, 90, C['purple']),          # top-left
        'Series\n系列': (W*0.58, H*0.82, 140, 90, C['accent']),       # top-right
        'SimilarBook\n相似图书': (W/2, H*0.18, 180, 95, C['pink']),    # bottom
    }

    entity_positions = {}
    for label, (ex, ey, ew, eh, color) in entities.items():
        display = label.split('\n')[0]
        sub = label.split('\n')[1] if '\n' in label else ''
        draw_box(ax, ex, ey, ew, eh, f'{display}\n{sub}', color=color, fontsize=14, radius=15)
        entity_positions[label.split('\n')[0]] = (ex, ey, ew, eh)

    # Relationships
    # Book -[WRITTEN_BY]-> Author
    bx, by, bw, bh = entity_positions['Book']
    ax_x, ay_, aw, ah = entity_positions['Author']
    mid_y = (by + ay_) / 2
    draw_arrow(ax, bx - bw/2, by + bh/4, ax_x + aw/2, ay_ + ah/4,
               color=C['gray'], linewidth=2.5, style='->')
    ax.text((bx - bw/2 + ax_x + aw/2)/2, mid_y + 20, 'WRITTEN_BY\n撰写', ha='center',
            va='center', fontsize=11, color=C['secondary'], fontweight='bold')

    # Book -[PUBLISHED_BY]-> Publisher
    px, py_, pw, ph = entity_positions['Publisher']
    draw_arrow(ax, bx + bw/2, by + bh/4, px - pw/2, py_ + ph/4,
               color=C['gray'], linewidth=2.5, style='->')
    ax.text((bx + bw/2 + px - pw/2)/2, mid_y + 20, 'PUBLISHED_BY\n出版', ha='center',
            va='center', fontsize=11, color=C['teal'], fontweight='bold')

    # Book -[HAS_TAG]-> Tag
    tx, ty_, tw, th_ = entity_positions['Tag']
    draw_arrow(ax, bx - bw/4, by + bh/2, tx, ty_ - th_/2,
               color=C['gray'], linewidth=2.5, style='->')
    ax.text(bx - bw/4 - 40, (by + bh/2 + ty_ - th_/2)/2, 'HAS_TAG\n属于标签',
            ha='center', va='center', fontsize=11, color=C['purple'], fontweight='bold')

    # Book -[BELONGS_TO]-> Series
    sx, sy_, sw, sh_ = entity_positions['Series']
    draw_arrow(ax, bx + bw/4, by + bh/2, sx, sy_ - sh_/2,
               color=C['gray'], linewidth=2.5, style='->')
    ax.text(bx + bw/4 + 40, (by + bh/2 + sy_ - sh_/2)/2, 'BELONGS_TO\n属于系列',
            ha='center', va='center', fontsize=11, color=C['accent'], fontweight='bold')

    # Book -[SIMILAR_TO]-> SimilarBook
    sbx, sby, sbw, sbh = entity_positions['SimilarBook']
    draw_arrow(ax, bx, by - bh/2, sbx, sby + sbh/2,
               color=C['gray'], linewidth=2.5, style='<->')
    ax.text(bx + 30, (by - bh/2 + sby + sbh/2)/2, 'SIMILAR_TO\n相似推荐',
            ha='center', va='center', fontsize=11, color=C['pink'], fontweight='bold')

    # Legend
    lx, ly = W*0.75, H*0.14
    legend_items = [
        ('实体 (Node)', C['primary']),
        ('关系 (Edge)', C['gray']),
    ]
    for i, (label, color) in enumerate(legend_items):
        ax.text(lx, ly - i * 30, f'■  {label}', fontsize=12, color=color,
                fontweight='bold')

    ax.text(W/2, 15, '附图1  知识图谱实体关系模型图', ha='center', va='center',
            fontsize=16, color=C['gray'], style='italic')

    save_image(fig, 'image7_知识图谱实体关系模型图.png')


# ============================================================
# 图8: 混合推荐策略示意图 (附图2)
# ============================================================
def generate_image8():
    fig, ax, W, H = new_figure(18, 10)

    ax.text(W/2, H - 35, '混合推荐策略示意图', ha='center', va='top',
            fontsize=26, fontweight='bold', color=C['dark'])

    # Input data sources at the top
    inputs = [
        ('用户画像\n(标签偏好/阅读历史\n评分记录)', C['primary']),
        ('阅读行为\n(浏览/搜索/收藏\n阅读时长/进度)', C['secondary']),
        ('图书知识图谱\n(Neo4j实体关系\n相似度路径)', C['teal']),
    ]

    input_positions = []
    iw, ih = 280, 110
    for i, (text, color) in enumerate(inputs):
        ix = W * 0.15 + i * W * 0.27
        iy = H * 0.78
        draw_box(ax, ix, iy, iw, ih, text, color=color, fontsize=13, radius=12)
        input_positions.append((ix, iy, iw, ih))

    # Arrows from inputs down to recommendation strategies
    for ix, iy, iw_, ih_ in input_positions:
        draw_line(ax, ix, iy - ih_/2, ix, H*0.55 + 50, color=C['light_gray'], linewidth=1.5, style='--')

    # 4 recommendation strategies
    strategies = [
        ('知识图谱推荐', '40%', f'基于Neo4j图路径\nCypher查询相似图书\n多跳关系发现\n可解释路径展示', C['primary'], W*0.20, H*0.40),
        ('协同过滤推荐', '40%', f'ItemCF算法\n用户-物品相似度\n余弦相似度计算\n基于阅读行为', C['secondary'], W*0.42, H*0.40),
        ('热门推荐', '10%', f'全站热榜TOP30\n浏览量/收藏量\n评论数/评分\n时效性加权', C['accent'], W*0.64, H*0.40),
        ('最新推荐', '10%', f'最新上架图书\n按出版时间排序\n新书曝光保障\n长尾内容挖掘', C['purple'], W*0.86, H*0.40),
    ]

    strategy_positions = []
    sw, sh = 210, 150
    for label, pct, desc, color, sx, sy in strategies:
        draw_box(ax, sx, sy, sw, sh, f'{label}\n({pct})', color=color,
                 fontsize=14, radius=12)
        # Description below
        ax.text(sx, sy - sh/2 - 12, desc, ha='center', va='top',
                fontsize=10, color=C['text'], style='italic')
        strategy_positions.append((sx, sy, sw, sh, label, pct))

    # Arrows from strategies to fusion center
    fusion_x, fusion_y = W/2, H*0.12
    for sx, sy, sw_, sh_, label, pct in strategy_positions:
        draw_arrow(ax, sx, sy - sh_/2, fusion_x, fusion_y + 60,
                   color=C['gray'], linewidth=2, style='->',
                   connectionstyle='arc3,rad=0')

    # Fusion center
    fusion_w, fusion_h = 350, 85
    draw_box(ax, fusion_x, fusion_y, fusion_w, fusion_h,
             '加权融合引擎\nα*KG + β*CF + γ*Hot + δ*New',
             color=C['red'], fontsize=14, radius=12)

    # Output
    output_y = fusion_y - fusion_h/2 - 80
    draw_box(ax, fusion_x, output_y, 320, 70,
             '个性化推荐列表\nTop-N 推荐结果 + 推荐理由',
             color=C['dark'], fontsize=14, radius=12)

    draw_arrow(ax, fusion_x, fusion_y - fusion_h/2, fusion_x, output_y + 35,
               color=C['gray'], linewidth=3, style='->')

    # Weight annotation
    ax.text(W/2, H*0.28, '← 可配置权重 →', ha='center', va='center',
            fontsize=12, color=C['gray'], style='italic')

    ax.text(W/2, 10, '附图2  混合推荐策略示意图', ha='center', va='center',
            fontsize=16, color=C['gray'], style='italic')

    save_image(fig, 'image8_混合推荐策略示意图.png')


# ============================================================
# Main
# ============================================================
if __name__ == '__main__':
    print('Generating 8 diagrams with clear text and proper arrows...')
    print()
    generate_image1()
    generate_image2()
    generate_image3()
    generate_image4()
    generate_image5()
    generate_image6()
    generate_image7()
    generate_image8()
    print()
    print(f'All 8 images generated in: {OUTPUT_DIR}/')
