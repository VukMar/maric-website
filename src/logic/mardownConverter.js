export const markdownToHtml = (markdown) => {
    // Convert Markdown headers
    markdown = markdown.replace(/^# (.*)$/gm, '<h1>$1</h1>');
    markdown = markdown.replace(/^## (.*)$/gm, '<h2>$1</h2>');
    markdown = markdown.replace(/^### (.*)$/gm, '<h3>$1</h3>');
    // Add support for more header levels as needed

    // Convert horizontal rules
    markdown = markdown.replace(/---/g, '<hr>');

    // Convert Markdown paragraphs
    markdown = '<p>' + markdown.replace(/\n\n|\r\n\r\n|\r\r/g, '</p><p>') + '</p>';

    // Convert Markdown lists
    markdown = markdown.replace(/^\* (.*)$/gm, '<li>$1</li>');
    markdown = '<ul>' + markdown.replace(/<\/li>\s<li>/g, '</li><li>') + '</li></ul>';

    // Convert Markdown links
    markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Convert Markdown images
    markdown = markdown.replace(/!\[([^\]]+)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">');

    // Convert Markdown code blocks with language names
    markdown = convertCodeBlocks(markdown);

    return markdown;
};

const convertCodeBlocks = (markdown) => {
    return markdown.replace(/```(\w+)\s*([\s\S]*?)```/g, (match, language, code) => {
        // Escape HTML characters in code
        code = code.replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Construct HTML for code block with language name and code
        const html = `<pre class="code-block language-${language}">${code}</pre>`;

        return html;
    });
};