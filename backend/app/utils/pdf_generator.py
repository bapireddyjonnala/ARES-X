from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor
import re

def clean_markdown_inline(text):
    # 1. Escape XML characters first to prevent ReportLab parser crashes
    text = text.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    # 2. Convert bold **text** or __text__ -> <b>text</b>
    text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
    text = re.sub(r'__(.*?)__', r'<b>\1</b>', text)
    # 3. Convert italic *text* or _text_ -> <i>text</i>
    text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
    text = re.sub(r'_(.*?)_', r'<i>\1</i>', text)
    return text

def convert_markdown_to_flowables(md_text, styles):
    flowables = []
    if not md_text:
        return flowables
        
    lines = md_text.split('\n')
    in_list = False
    
    for line in lines:
        line = line.strip()
        if not line:
            if in_list:
                flowables.append(Spacer(1, 6))
                in_list = False
            continue
            
        # Horizontal rules
        if line == '---' or line == '***':
            flowables.append(
                HRFlowable(
                    width="100%", 
                    thickness=1, 
                    color=HexColor("#e5e7eb"), 
                    spaceBefore=10, 
                    spaceAfter=10
                )
            )
            in_list = False
            continue
            
        # Headings
        heading_match = re.match(r'^(#{1,6})\s+(.*)$', line)
        if heading_match:
            level = len(heading_match.group(1))
            heading_text = clean_markdown_inline(heading_match.group(2))
            # Map levels cleanly
            if level <= 2:
                style_name = 'Heading3'
            else:
                style_name = 'NormalBold'
                
            flowables.append(Paragraph(heading_text, styles[style_name]))
            flowables.append(Spacer(1, 6))
            in_list = False
            continue
            
        # Bullet list items
        bullet_match = re.match(r'^[\-\*\+]\s+(.*)$', line)
        if bullet_match:
            bullet_text = clean_markdown_inline(bullet_match.group(1))
            flowables.append(Paragraph(f"&bull; {bullet_text}", styles["BulletText"]))
            in_list = True
            continue
            
        # Numbered list items
        num_match = re.match(r'^(\d+)\.\s+(.*)$', line)
        if num_match:
            num = num_match.group(1)
            num_text = clean_markdown_inline(num_match.group(2))
            flowables.append(Paragraph(f"{num}. {num_text}", styles["BulletText"]))
            in_list = True
            continue
            
        # Normal body paragraph
        line_clean = clean_markdown_inline(line)
        flowables.append(Paragraph(line_clean, styles["NormalBody"]))
        flowables.append(Spacer(1, 8))
        in_list = False
        
    return flowables

def create_pdf(filename, report_data):
    topic = report_data.get("topic", "Scientific Discovery Topic")
    
    # Establish doc template with margins
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=54, leftMargin=54,
        topMargin=54, bottomMargin=54
    )
    
    # Retrieve base styles
    base_styles = getSampleStyleSheet()
    
    # Create unified custom styles
    styles = {}
    
    styles['DocTitle'] = ParagraphStyle(
        'DocTitle',
        parent=base_styles['Title'],
        fontName='Helvetica-Bold',
        fontSize=24,
        leading=28,
        textColor=HexColor('#1e1b4b'),  # Deep violet
        alignment=0, # Left-aligned title
        spaceAfter=15
    )
    
    styles['DocSubtitle'] = ParagraphStyle(
        'DocSubtitle',
        parent=base_styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=12,
        leading=16,
        textColor=HexColor('#4b5563'),
        spaceAfter=20
    )
    
    styles['SectionHeader'] = ParagraphStyle(
        'SectionHeader',
        parent=base_styles['Heading2'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=HexColor('#4f46e5'),  # Indigo
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )
    
    styles['Heading3'] = ParagraphStyle(
        'Heading3',
        parent=base_styles['Heading3'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=HexColor('#1f2937'),
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )
    
    styles['NormalBold'] = ParagraphStyle(
        'NormalBold',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=HexColor('#111827'),
        spaceBefore=6,
        spaceAfter=4,
        keepWithNext=True
    )
    
    styles['NormalBody'] = ParagraphStyle(
        'NormalBody',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=HexColor('#1f2937'),  # Dark Slate
        spaceAfter=8
    )
    
    styles['BulletText'] = ParagraphStyle(
        'BulletText',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=10,
        leading=14,
        textColor=HexColor('#1f2937'),
        leftIndent=15,
        firstLineIndent=-10,
        spaceAfter=5
    )
    
    styles['PaperTitle'] = ParagraphStyle(
        'PaperTitle',
        parent=base_styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=HexColor('#111827'),
        spaceBefore=6,
        spaceAfter=2
    )
    
    styles['PaperMeta'] = ParagraphStyle(
        'PaperMeta',
        parent=base_styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=11,
        textColor=HexColor('#4b5563'),
        spaceAfter=3
    )
    
    styles['PaperSummary'] = ParagraphStyle(
        'PaperSummary',
        parent=base_styles['Normal'],
        fontName='Helvetica',
        fontSize=9.5,
        leading=13,
        textColor=HexColor('#374151'),
        leftIndent=10,
        spaceAfter=6
    )

    story = []
    
    # 1. Main Cover Title
    story.append(Paragraph("ARES-X Research Report", styles["DocTitle"]))
    story.append(Paragraph(f"<b>Research Topic:</b> {topic}", styles["DocSubtitle"]))
    
    story.append(
        HRFlowable(
            width="100%", 
            thickness=2, 
            color=HexColor("#4f46e5"), 
            spaceBefore=5, 
            spaceAfter=15
        )
    )
    
    # Capitalized label mapping
    key_mapping = {
        "research_plan": "Detailed Research Plan",
        "literature": "Literature Review & Search Results",
        "gap_analysis": "Research Gap Analysis",
        "hypotheses": "Formulated Research Hypotheses"
    }

    # Render each section
    for key, value in report_data.items():
        if key == "topic" or not value:
            continue
            
        section_title = key_mapping.get(key, key.replace("_", " ").title())
        
        # Section Header
        story.append(Paragraph(section_title, styles["SectionHeader"]))
        
        # Section Content
        if key == "literature" and isinstance(value, dict):
            # Special literature layout
            papers = value.get("papers", [])
            story.append(
                Paragraph(f"Papers identified during autonomous search: {value.get('papers_found', 0)}", styles["NormalBody"])
            )
            story.append(Spacer(1, 8))
            
            for paper in papers:
                title = paper.get("title", "Untitled")
                authors = ", ".join(paper.get("authors", [])) if isinstance(paper.get("authors"), list) else str(paper.get("authors", ""))
                published = paper.get("published", "Unknown Date")
                summary = paper.get("summary", "")
                
                story.append(Paragraph(f"<b>Paper:</b> {title}", styles["PaperTitle"]))
                story.append(Paragraph(f"<i>Authors:</i> {authors} | <i>Published:</i> {published}", styles["PaperMeta"]))
                if summary:
                    story.append(Paragraph(summary, styles["PaperSummary"]))
                story.append(Spacer(1, 6))
        else:
            # Markdown text formatting
            flowables = convert_markdown_to_flowables(str(value), styles)
            story.extend(flowables)
            
        story.append(Spacer(1, 10))
        
    # Metadata page callback for browser title & author
    def add_metadata(canvas, doc_obj):
        canvas.saveState()
        canvas.setTitle(f"ARES-X Research Report: {topic}")
        canvas.setAuthor("ARES-X Autonomous Scientific Discovery Engine")
        canvas.setSubject(f"Research plan and findings on: {topic}")
        canvas.restoreState()
        
    doc.build(
        story, 
        onFirstPage=add_metadata, 
        onLaterPages=add_metadata
    )
    
    return filename