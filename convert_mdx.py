#!/usr/bin/env python3
"""
Скрипт для конвертации MDX файлов из Astro Starlight в VitePress Markdown
"""
import os
import re
from pathlib import Path

def convert_mdx_to_md(content: str) -> str:
    """Конвертирует MDX контент в Markdown для VitePress"""
    
    # Удаляем специфичные для Starlight frontmatter поля
    content = re.sub(r'template:\s*splash\n', '', content)
    content = re.sub(r'hero:\s*\n[\s\S]*?actions:[\s\S]*?---', '', content)
    
    # Конвертируем импорты Starlight компонентов
    content = re.sub(
        r"import\s+\{[^}]*\}\s+from\s+'@astrojs/starlight/components';?",
        '',
        content
    )
    
    # Конвертируем Tabs/TabItem в VitePress формат
    # Starlight: <Tabs><TabItem label="X">content</TabItem></Tabs>
    # VitePress: ::: tabs / ::: tab X / content / ::: 
    def convert_tabs(match):
        tabs_content = match.group(1)
        # Извлекаем TabItem элементы
        tab_items = re.findall(r'<TabItem label="([^"]+)">([\s\S]*?)</TabItem>', tabs_content)
        if not tab_items:
            return match.group(0)
        
        result = '::: tabs\n'
        for label, content in tab_items:
            result += f'\n::: tab {label}\n{content}\n:::\n'
        result += ':::'
        return result
    
    content = re.sub(
        r'<Tabs>([\s\S]*?)</Tabs>',
        convert_tabs,
        content
    )
    
    # Удаляем CardGrid и Card - они будут заменены Vue компонентами
    # (это нужно делать вручную, так как они требуют импорта)
    
    return content

def process_file(source_path: Path, dest_path: Path):
    """Обрабатывает один файл"""
    print(f"Конвертирую {source_path} -> {dest_path}")
    
    with open(source_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Конвертируем контент
    converted = convert_mdx_to_md(content)
    
    # Создаем директорию если нужно
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    
    # Сохраняем
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(converted)

def main():
    source_dir = Path('src/content/docs')
    dest_dir = Path('.')
    
    if not source_dir.exists():
        print(f"Исходная директория {source_dir} не найдена!")
        return
    
    # Обрабатываем все .mdx файлы
    for mdx_file in source_dir.rglob('*.mdx'):
        # Создаем путь назначения
        relative_path = mdx_file.relative_to(source_dir)
        
        # index.mdx -> index.md, остальные сохраняют имя
        if relative_path.name == 'index.mdx':
            dest_file = dest_dir / relative_path.parent / 'index.md'
        else:
            dest_file = dest_dir / relative_path.with_suffix('.md')
        
        process_file(mdx_file, dest_file)
    
    # Также обрабатываем .md файлы (если есть)
    for md_file in source_dir.rglob('*.md'):
        relative_path = md_file.relative_to(source_dir)
        dest_file = dest_dir / relative_path
        process_file(md_file, dest_file)

if __name__ == '__main__':
    main()

