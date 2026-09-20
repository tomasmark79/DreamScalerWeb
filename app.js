'use strict';
const root = document.documentElement;
const themeButton = document.getElementById('theme-toggle');
function setTheme(theme) {
  root.dataset.theme = theme;
  const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
  themeButton.setAttribute('aria-label', label);
  themeButton.title = label;
  document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#101510' : '#f4f5ed';
}
try { setTheme(localStorage.getItem('dreamscaler-web-theme') === 'light' ? 'light' : 'dark'); } catch { setTheme('dark'); }
themeButton.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(theme);
  try { localStorage.setItem('dreamscaler-web-theme', theme); } catch { /* The toggle also works without storage. */ }
});
const features = {
  demo: { number: '01', title: 'See DreamScaler in action.', description: 'From connecting the LED strip to exploring your first scale. Explore the standalone app and bring your keyboard to life.', points: ['Connect and align the strip', 'Explore scales and chord progressions', 'Choose colours and brightness'], image: 'standalone-scales.png', alt: 'DreamScaler standalone app with scale selection and a coloured keyboard preview' },
  scales: { number: '02', title: 'Find your next sound.', description: 'Find your way around 44 scales directly on your keys. Use colours to distinguish scale degrees, or keep it simple with one colour.', points: ['Any root note, with search and filters', 'Mood descriptions for inspiration', 'Colour by degree or a single colour'], image: 'standalone-scales.png', alt: 'DreamScaler Scales view with scale selection and a coloured keyboard preview' },
  chords: { number: '03', title: 'Watch harmony unfold.', description: 'Practise chord shapes and follow the notes from one chord to the next. Step through a progression or let it loop at your own pace.', points: ['Six chord progressions', 'Adjustable tempo and looping', 'Step through chords manually'], image: 'standalone-chords.png', alt: 'DreamScaler Chords view with progression steps, tempo and keyboard preview' },
  playground: { number: '04', title: 'Make room for colour.', description: 'Give your keys a different mood. Explore moving light effects, slow things down or create your own colour.', points: ['Six effects, from Rainbow to Wave', 'Adjustable speed and brightness', 'Custom RGBW colour'], image: 'standalone-playgrounds.png', alt: 'DreamScaler Light playground with six colourful lighting effects' },
  instrument: { number: '05', title: 'Make it fit your keys.', description: 'Every keyboard is different. Set up a profile to align each LED with its key, then check the fit with the built-in light tests.', points: ['Custom profiles for your keyboards', 'Strip offset and either direction', 'White, black and octave tests'], image: 'standalone-instrumenr.png', alt: 'DreamScaler Instrument view with profile selection, layout tests and strip alignment' },
  bitwig: { number: '07', title: 'See what your DAW is playing.', description: 'See playing notes on your LED strip and sync root and scale with Bitwig 6.', points: ['Two-way root and scale sync', 'Simple Project Remotes setup', '21 mapped scales'], image: 'dreamscaler-bitwig-extension.png', alt: 'DreamScaler Bitwig extension with root and scale synchronization controls', caption: 'A look inside the Bitwig extension' },
  preferences: { number: '06', title: 'Your space. Your way.', description: 'Keep your workspace comfortable. Choose a theme, switch language and pick the note spelling that feels natural to you.', points: ['Studio Dark and Studio Light', 'English, Czech and German', 'Sharp or flat note names'], image: 'standalone-preference.png', alt: 'DreamScaler Preferences view with theme, language and note spelling options' }
};
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
function selectFeature(tab) {
  const feature = features[tab.dataset.feature];
  tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
  document.getElementById('feature-panel').setAttribute('aria-labelledby', tab.id);
  document.getElementById('feature-number').textContent = `${feature.number} / ${tabs.length.toString().padStart(2, '0')}`;
  document.getElementById('feature-title').textContent = feature.title;
  document.getElementById('feature-description').textContent = feature.description;
  document.getElementById('feature-points').replaceChildren(...feature.points.map(point => { const li = document.createElement('li'); li.textContent = point; return li; }));
  document.querySelector('.screenshot-caption').firstChild.textContent = `${feature.caption || 'A look inside the standalone app'} `;
  const media = document.getElementById('feature-media');
  if (feature.video) {
    if (media.querySelector('iframe')?.getAttribute('src') === feature.video) return;
    const video = document.createElement('iframe');
    video.src = feature.video;
    video.title = feature.videoTitle || 'DreamScaler standalone app demo';
    video.width = '1280';
    video.height = '720';
    video.loading = 'lazy';
    video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    video.referrerPolicy = 'strict-origin-when-cross-origin';
    video.allowFullscreen = true;
    media.replaceChildren(video);
  } else {
    const image = document.createElement('img');
    image.id = 'feature-image';
    image.src = `assets/${feature.image}`;
    image.alt = feature.alt;
    image.width = 1984;
    image.height = 1375;
    image.loading = 'lazy';
    media.replaceChildren(image);
  }
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectFeature(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault(); tabs[next].focus(); selectFeature(tabs[next]);
  });
});
