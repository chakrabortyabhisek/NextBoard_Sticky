// Inlined script to prevent flash of wrong theme on load
export function ThemeScript() {
  const script = `
    (function() {
      try {
        var stored = localStorage.getItem('theme');
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        var dark = stored === 'dark' || (!stored && prefersDark);
        var html = document.documentElement;
        if (dark) {
          html.classList.remove('light');
          html.classList.add('dark');
        } else {
          html.classList.remove('dark');
          html.classList.add('light');
        }
      } catch(e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
