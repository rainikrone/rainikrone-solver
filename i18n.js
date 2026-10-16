// Interface translations. French is the default; the choice is remembered per browser.

const STRINGS = {
  fr: {
    title: 'Solveur Rainikrone',
    sub: 'Le bonheur est dans le spray : peignez les glyphes, puis lancez la résolution.',
    boardLabel: 'Plateau du combat',
    'hint.paint': 'Choisissez une couleur, puis cliquez ou glissez sur le plateau.',
    'hint.replay': 'Relecture : la flèche indique le prochain saut. Utilisez ← → ou les boutons.',
    'shot.title': "Depuis une capture d'écran",
    'shot.desc': "Appuyez sur <kbd>Ctrl</kbd>+<kbd>V</kbd> n'importe où sur la page pour coller une capture du combat, ou déposez une image ici.",
    'shot.choose': 'Choisir une image…',
    'shot.apply': 'Utiliser ce plateau',
    'shot.repick': 'Replacer les coins',
    'shot.check': 'Vérifiez les lettres sur les cases, puis utilisez ce plateau. Mal placées ? Replacez les coins.',
    'shot.click': 'Cliquez au centre de la case rose {corner} ({n}/4).',
    'shot.corners': ['du haut', 'de droite', 'du bas', 'de gauche'],
    paint: 'Peindre',
    fill: 'Tout remplir avec la couleur',
    fillEmpty: 'Remplir les cases vides',
    reset: 'Réinitialiser le plateau',
    solve: 'Résoudre',
    cancel: 'Annuler',
    route: 'Trajet',
    routeLen: '· {n} sauts, {t} tours',
    turn: 'Tour {n}',
    'btn.first': 'Retour au départ',
    'btn.prev': 'Précédent (←)',
    'btn.play': 'Lecture / pause',
    'btn.next': 'Suivant (→)',
    'btn.resolveTitle': 'Utiliser le plateau à cette étape comme nouveau départ',
    'btn.resolve': 'Modifier depuis cette étape',
    'btn.close': "Retour à l'édition",
    rulesTitle: 'Règles utilisées',
    rules: `<li>Chaque saut avance d'une case (↗ ↘ ↙ ↖), jamais dans un trou ni hors du plateau.</li>
      <li><b>Jaune</b> → devient rouge et vous pousse d'une case de plus dans la même direction (vous restez sur place si c'est bloqué).</li>
      <li><b>Rouge</b> → devient vert ; ses 4 voisines changent : Jaune → Rouge → Vert → Noir → Jaune.</li>
      <li><b>Vert</b> → devient jaune et vous fait reculer d'un pas sur votre trajet. Si cette case est verte aussi, vous reculez encore, et ainsi de suite.</li>
      <li><b>Noir</b> → devient rouge et vous renvoie sur la dernière case sans glyphe où vous étiez (le centre, ou un coin déjà nettoyé).</li>
      <li><b>Rose</b> → Rainikrone −1 PV, la case devient vide.</li>
      <li>Chaque case où vous arrivez se déclenche, même après une poussée ou un recul : les effets s'enchaînent.</li>
      <li>12 PA = 12 sauts par tour ; passer son tour ne change rien.</li>`,
    'color.yellow': 'Jaune', 'color.red': 'Rouge', 'color.green': 'Vert', 'color.black': 'Noir',
    'color.pink': 'Rose', 'color.empty': 'Vide', 'color.start': 'Départ',
    letters: { 2: 'J', 3: 'R', 4: 'V', 5: 'N', 6: '★' },
    'status.noPink': "Il n'y a aucun glyphe rose à prendre.",
    'status.startHole': 'La case de départ est un trou.',
    'status.searching': 'Recherche…',
    'status.progress': 'Recherche… {k} M positions examinées',
    'status.progressBest': ', meilleur trajet : {n} sauts',
    'status.notFound': 'Aucun trajet trouvé ({s} s). Vérifiez les couleurs.',
    'status.found': '{n} sauts trouvés en {s} s.',
    'status.crashed': 'Le solveur a planté : {m}',
    'status.cancelled': 'Annulé.',
    'status.shotApplied': 'Plateau lu depuis la capture. Corrigez les cases fausses, puis lancez Résoudre.',
    'cell.center': 'le centre',
    'cell.corners': ['le coin du haut', 'le coin de droite', 'le coin du bas', 'le coin de gauche'],
    'cell.free': 'une case libre',
    'log.pink': 'Rose : Rainikrone −1 PV',
    'log.empty': 'case vide',
    'log.push': 'poussé {a}',
    'log.stuck': 'poussée bloquée',
    'log.shift': 'les voisines changent de couleur',
    'log.back': 'recul',
    'log.black': 'renvoyé vers {c}',
    'step.start': 'Départ. Premier saut : {a}',
    'step.jump': 'Saut {s}/{total} (tour {turn}, {i}/12) {a} : {d}',
    'step.done': '. Terminé !',
    'step.endTurn': '. Fin du tour.',
  },

  en: {
    title: 'Rainikrone Solver',
    sub: 'Le bonheur est dans le spray: paint the glyphs, then solve.',
    boardLabel: 'Fight board',
    'hint.paint': 'Pick a colour, then click or drag on the board.',
    'hint.replay': 'Replay: the arrow shows the next jump. Use ← → or the buttons.',
    'shot.title': 'From a screenshot',
    'shot.desc': 'Press <kbd>Ctrl</kbd>+<kbd>V</kbd> anywhere on this page to paste a screenshot of the fight, or drop an image file here.',
    'shot.choose': 'Choose image…',
    'shot.apply': 'Use this board',
    'shot.repick': 'Re-pick corners',
    'shot.check': 'Check the letters on the cells, then use this board. Wrong spot? Re-pick the corners.',
    'shot.click': 'Click the centre of the {corner} pink cell ({n}/4).',
    'shot.corners': ['top', 'right', 'bottom', 'left'],
    paint: 'Paint',
    fill: 'Fill all with colour',
    fillEmpty: 'Fill empty cells',
    reset: 'Reset board',
    solve: 'Solve',
    cancel: 'Cancel',
    route: 'Route',
    routeLen: '· {n} jumps, {t} turns',
    turn: 'Turn {n}',
    'btn.first': 'Back to start',
    'btn.prev': 'Previous (←)',
    'btn.play': 'Play / pause',
    'btn.next': 'Next (→)',
    'btn.resolveTitle': 'Use the board at this step as the new starting point',
    'btn.resolve': 'Edit from this step',
    'btn.close': 'Back to editing',
    rulesTitle: 'Rules used',
    rules: `<li>Each jump moves one cell (↗ ↘ ↙ ↖), never into a hole or off the board.</li>
      <li><b>Yellow</b> → turns red, pushes you one more cell in the same direction (stays put if blocked).</li>
      <li><b>Red</b> → turns green, its 4 neighbours shift Yellow → Red → Green → Black → Yellow.</li>
      <li><b>Green</b> → turns yellow, sends you back one step along your path. If that cell is green too, it rewinds again, and so on.</li>
      <li><b>Black</b> → turns red, sends you back to the last glyph-free cell you stood on (the centre, or a corner you cleared).</li>
      <li><b>Pink</b> → Rainikrone −1 PV, becomes empty.</li>
      <li>Every cell you arrive on triggers, including after a push or a rewind, so effects can chain.</li>
      <li>12 AP = 12 jumps per turn; passing a turn changes nothing.</li>`,
    'color.yellow': 'Yellow', 'color.red': 'Red', 'color.green': 'Green', 'color.black': 'Black',
    'color.pink': 'Pink', 'color.empty': 'Empty', 'color.start': 'Start',
    letters: { 2: 'Y', 3: 'R', 4: 'G', 5: 'B', 6: '★' },
    'status.noPink': 'There is no pink glyph to take.',
    'status.startHole': 'The start cell is a hole.',
    'status.searching': 'Searching…',
    'status.progress': 'Searching… {k}M positions checked',
    'status.progressBest': ', best so far {n} jumps',
    'status.notFound': 'No route found ({s}s). Check the colours.',
    'status.found': 'Found {n} jumps in {s}s.',
    'status.crashed': 'Solver crashed: {m}',
    'status.cancelled': 'Cancelled.',
    'status.shotApplied': 'Board read from the screenshot. Fix any wrong cell, then Solve.',
    'cell.center': 'the centre',
    'cell.corners': ['the top corner', 'the right corner', 'the bottom corner', 'the left corner'],
    'cell.free': 'a free cell',
    'log.pink': 'Pink: Rainikrone −1 PV',
    'log.empty': 'empty cell',
    'log.push': 'pushed {a}',
    'log.stuck': 'push blocked',
    'log.shift': 'neighbours shift colour',
    'log.back': 'rewound',
    'log.black': 'sent to {c}',
    'step.start': 'Start. First jump: {a}',
    'step.jump': 'Jump {s}/{total} (turn {turn}, {i}/12) {a}: {d}',
    'step.done': '. Done!',
    'step.endTurn': '. End of turn.',
  },

  es: {
    title: 'Solucionador Rainikrone',
    sub: 'Le bonheur est dans le spray: pinta los glifos y luego resuelve.',
    boardLabel: 'Tablero del combate',
    'hint.paint': 'Elige un color y luego haz clic o arrastra sobre el tablero.',
    'hint.replay': 'Repetición: la flecha indica el siguiente salto. Usa ← → o los botones.',
    'shot.title': 'Desde una captura de pantalla',
    'shot.desc': 'Pulsa <kbd>Ctrl</kbd>+<kbd>V</kbd> en cualquier parte de la página para pegar una captura del combate, o suelta aquí un archivo de imagen.',
    'shot.choose': 'Elegir imagen…',
    'shot.apply': 'Usar este tablero',
    'shot.repick': 'Volver a marcar las esquinas',
    'shot.check': 'Comprueba las letras de las casillas y luego usa este tablero. ¿Mal colocadas? Vuelve a marcar las esquinas.',
    'shot.click': 'Haz clic en el centro de la casilla rosa {corner} ({n}/4).',
    'shot.corners': ['de arriba', 'de la derecha', 'de abajo', 'de la izquierda'],
    paint: 'Pintar',
    fill: 'Rellenar todo con el color',
    fillEmpty: 'Rellenar casillas vacías',
    reset: 'Reiniciar tablero',
    solve: 'Resolver',
    cancel: 'Cancelar',
    route: 'Ruta',
    routeLen: '· {n} saltos, {t} turnos',
    turn: 'Turno {n}',
    'btn.first': 'Volver al inicio',
    'btn.prev': 'Anterior (←)',
    'btn.play': 'Reproducir / pausa',
    'btn.next': 'Siguiente (→)',
    'btn.resolveTitle': 'Usar el tablero en este paso como nuevo punto de partida',
    'btn.resolve': 'Editar desde este paso',
    'btn.close': 'Volver a editar',
    rulesTitle: 'Reglas usadas',
    rules: `<li>Cada salto avanza una casilla (↗ ↘ ↙ ↖), nunca a un agujero ni fuera del tablero.</li>
      <li><b>Amarillo</b> → se vuelve rojo y te empuja una casilla más en la misma dirección (te quedas si está bloqueado).</li>
      <li><b>Rojo</b> → se vuelve verde; sus 4 vecinas cambian: Amarillo → Rojo → Verde → Negro → Amarillo.</li>
      <li><b>Verde</b> → se vuelve amarillo y te hace retroceder un paso en tu recorrido. Si esa casilla también es verde, retrocedes otra vez, y así sucesivamente.</li>
      <li><b>Negro</b> → se vuelve rojo y te envía a la última casilla sin glifo en la que estuviste (el centro o una esquina ya despejada).</li>
      <li><b>Rosa</b> → Rainikrone −1 PV, la casilla queda vacía.</li>
      <li>Toda casilla a la que llegas se activa, también tras un empuje o un retroceso, así que los efectos se encadenan.</li>
      <li>12 PA = 12 saltos por turno; pasar el turno no cambia nada.</li>`,
    'color.yellow': 'Amarillo', 'color.red': 'Rojo', 'color.green': 'Verde', 'color.black': 'Negro',
    'color.pink': 'Rosa', 'color.empty': 'Vacía', 'color.start': 'Inicio',
    letters: { 2: 'A', 3: 'R', 4: 'V', 5: 'N', 6: '★' },
    'status.noPink': 'No hay ningún glifo rosa que tomar.',
    'status.startHole': 'La casilla de inicio es un agujero.',
    'status.searching': 'Buscando…',
    'status.progress': 'Buscando… {k} M posiciones revisadas',
    'status.progressBest': ', mejor hasta ahora: {n} saltos',
    'status.notFound': 'No se encontró ninguna ruta ({s} s). Revisa los colores.',
    'status.found': '{n} saltos encontrados en {s} s.',
    'status.crashed': 'El solucionador falló: {m}',
    'status.cancelled': 'Cancelado.',
    'status.shotApplied': 'Tablero leído desde la captura. Corrige las casillas erróneas y luego pulsa Resolver.',
    'cell.center': 'el centro',
    'cell.corners': ['la esquina de arriba', 'la esquina derecha', 'la esquina de abajo', 'la esquina izquierda'],
    'cell.free': 'una casilla libre',
    'log.pink': 'Rosa: Rainikrone −1 PV',
    'log.empty': 'casilla vacía',
    'log.push': 'empujado {a}',
    'log.stuck': 'empuje bloqueado',
    'log.shift': 'las vecinas cambian de color',
    'log.back': 'retroceso',
    'log.black': 'enviado a {c}',
    'step.start': 'Inicio. Primer salto: {a}',
    'step.jump': 'Salto {s}/{total} (turno {turn}, {i}/12) {a}: {d}',
    'step.done': '. ¡Hecho!',
    'step.endTurn': '. Fin del turno.',
  },
};

let lang = 'fr';
try {
  const saved = localStorage.getItem('minikrone-lang');
  if (STRINGS[saved]) lang = saved;
} catch (e) { /* storage unavailable */ }

// Translated string with {param} substitution; non-string entries (lists, letter maps) as-is.
function t(key, params) {
  const s = key in STRINGS[lang] ? STRINGS[lang][key] : STRINGS.en[key];
  if (typeof s !== 'string') return s;
  return params ? s.replace(/\{(\w+)\}/g, (_, k) => (k in params ? params[k] : '')) : s;
}

// One decimal, with the language's decimal separator.
const fmt1 = x => x.toLocaleString(lang, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

const langListeners = [];
function onLangChange(fn) { langListeners.push(fn); }

function applyI18n() {
  document.documentElement.lang = lang;
  document.title = t('title');
  document.querySelectorAll('[data-i18n]').forEach(el => (el.textContent = t(el.dataset.i18n)));
  document.querySelectorAll('[data-i18n-html]').forEach(el => (el.innerHTML = t(el.dataset.i18nHtml)));
  document.querySelectorAll('[data-i18n-title]').forEach(el => (el.title = t(el.dataset.i18nTitle)));
  document.querySelectorAll('[data-i18n-aria]').forEach(el => el.setAttribute('aria-label', t(el.dataset.i18nAria)));
  langListeners.forEach(fn => fn());
}

function setLang(l) {
  if (!STRINGS[l]) return;
  lang = l;
  try { localStorage.setItem('minikrone-lang', l); } catch (e) { /* ignore */ }
  applyI18n();
}
