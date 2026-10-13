// Templates place page styles after the shared head partial. Move those real
// style tags into head so the rendered HTML is valid and styles load before paint.
// Consume scripts as whole tokens to leave code-editor HTML examples untouched.
export function normalizeHtml(html) {
  html = html.replace(/\r\n?/g, '\n').replace(/[ \t]+$/gm, '');
  const bodyStart = html.indexOf('<body');
  const headEnd = html.indexOf('</head>');
  if (bodyStart < 0 || headEnd < 0) return html;
  const styles = [];
  const body = html
    .slice(bodyStart)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi, (tag) => {
      if (/^<style\b/i.test(tag)) {
        styles.push(tag);
        return '';
      }
      return tag;
    });
  return html.slice(0, headEnd) + styles.join('\n') + html.slice(headEnd, bodyStart) + body;
}
