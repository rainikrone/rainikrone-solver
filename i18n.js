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
    'btn.last': 'Aller à la fin',
    speed: 'Vitesse',
    speedValue: '{s} s / saut',
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
    title: 'Rainikron Solver',
    sub: 'Oh, Happy Spray! Paint the glyphs, then solve.',
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
    'btn.last': 'Go to the end',
    speed: 'Speed',
    speedValue: '{s}s / jump',
    'btn.resolveTitle': 'Use the board at this step as the new starting point',
    'btn.resolve': 'Edit from this step',
    'btn.close': 'Back to editing',
    rulesTitle: 'Rules used',
    rules: `<li>Each jump moves one cell (↗ ↘ ↙ ↖), never into a hole or off the board.</li>
      <li><b>Yellow</b> → turns red, pushes you one more cell in the same direction (stays put if blocked).</li>
      <li><b>Red</b> → turns green, its 4 neighbours shift Yellow → Red → Green → Black → Yellow.</li>
      <li><b>Green</b> → turns yellow, sends you back one step along your path. If that cell is green too, it rewinds again, and so on.</li>
      <li><b>Black</b> → turns red, sends you back to the last glyph-free cell you stood on (the centre, or a corner you cleared).</li>
      <li><b>Pink</b> → Rainikron −1 HP, becomes empty.</li>
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
    'log.pink': 'Pink: Rainikron −1 HP',
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
    title: 'Solucionador de Lady Urikoíris',
    sub: 'La felicidad está en campo rociado: pinta los glifos y luego resuelve.',
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
    'btn.last': 'Ir al final',
    speed: 'Velocidad',
    speedValue: '{s} s / salto',
    'btn.resolveTitle': 'Usar el tablero en este paso como nuevo punto de partida',
    'btn.resolve': 'Editar desde este paso',
    'btn.close': 'Volver a editar',
    rulesTitle: 'Reglas usadas',
    rules: `<li>Cada salto avanza una casilla (↗ ↘ ↙ ↖), nunca a un agujero ni fuera del tablero.</li>
      <li><b>Amarillo</b> → se vuelve rojo y te empuja una casilla más en la misma dirección (te quedas si está bloqueado).</li>
      <li><b>Rojo</b> → se vuelve verde; sus 4 vecinas cambian: Amarillo → Rojo → Verde → Negro → Amarillo.</li>
      <li><b>Verde</b> → se vuelve amarillo y te hace retroceder un paso en tu recorrido. Si esa casilla también es verde, retrocedes otra vez, y así sucesivamente.</li>
      <li><b>Negro</b> → se vuelve rojo y te envía a la última casilla sin glifo en la que estuviste (el centro o una esquina ya despejada).</li>
      <li><b>Rosa</b> → Lady Urikoíris −1 PV, la casilla queda vacía.</li>
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
    'log.pink': 'Rosa: Lady Urikoíris −1 PV',
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
  de: {
    title: 'Regenbogen-Einohr-Löser',
    sub: 'Sprühen vor Freude: Glyphen einfärben, dann lösen.',
    boardLabel: 'Kampffeld',
    'hint.paint': 'Wähle eine Farbe und klicke oder ziehe dann über das Spielfeld.',
    'hint.replay': 'Wiedergabe: Der Pfeil zeigt den nächsten Sprung. Nutze ← → oder die Knöpfe.',
    'shot.title': 'Aus einem Screenshot',
    'shot.desc': 'Drücke <kbd>Strg</kbd>+<kbd>V</kbd> irgendwo auf der Seite, um einen Screenshot des Kampfes einzufügen, oder ziehe eine Bilddatei hierher.',
    'shot.choose': 'Bild auswählen…',
    'shot.apply': 'Dieses Spielfeld verwenden',
    'shot.repick': 'Ecken neu wählen',
    'shot.check': 'Prüfe die Buchstaben auf den Feldern und übernimm dann das Spielfeld. Falsch platziert? Wähle die Ecken neu.',
    'shot.click': 'Klicke auf die Mitte des {corner} rosa Feldes ({n}/4).',
    'shot.corners': ['oberen', 'rechten', 'unteren', 'linken'],
    paint: 'Malen',
    fill: 'Alles mit der Farbe füllen',
    fillEmpty: 'Leere Felder füllen',
    reset: 'Spielfeld zurücksetzen',
    solve: 'Lösen',
    cancel: 'Abbrechen',
    route: 'Route',
    routeLen: '· {n} Sprünge, {t} Runden',
    turn: 'Runde {n}',
    'btn.first': 'Zurück zum Start',
    'btn.prev': 'Zurück (←)',
    'btn.play': 'Abspielen / Pause',
    'btn.next': 'Weiter (→)',
    'btn.last': 'Zum Ende',
    speed: 'Tempo',
    speedValue: '{s} s / Sprung',
    'btn.resolveTitle': 'Das Spielfeld dieses Schritts als neuen Start verwenden',
    'btn.resolve': 'Ab diesem Schritt bearbeiten',
    'btn.close': 'Zurück zum Bearbeiten',
    rulesTitle: 'Verwendete Regeln',
    rules: `<li>Jeder Sprung geht ein Feld weit (↗ ↘ ↙ ↖), nie in ein Loch oder vom Spielfeld.</li>
      <li><b>Gelb</b> → wird rot und schiebt dich ein Feld weiter in dieselbe Richtung (du bleibst stehen, wenn es blockiert ist).</li>
      <li><b>Rot</b> → wird grün; die 4 Nachbarfelder wechseln: Gelb → Rot → Grün → Schwarz → Gelb.</li>
      <li><b>Grün</b> → wird gelb und schickt dich einen Schritt auf deinem Weg zurück. Ist dieses Feld auch grün, geht es weiter zurück, und so fort.</li>
      <li><b>Schwarz</b> → wird rot und schickt dich zum letzten glyphenfreien Feld zurück, auf dem du standest (die Mitte oder eine bereits geräumte Ecke).</li>
      <li><b>Rosa</b> → Regenbogen-Einohr −1 LP, das Feld wird leer.</li>
      <li>Jedes Feld, auf dem du ankommst, wird ausgelöst, auch nach einem Schub oder Rücksprung, sodass sich Effekte verketten können.</li>
      <li>12 AP = 12 Sprünge pro Runde; eine Runde zu beenden ändert nichts.</li>`,
    'color.yellow': 'Gelb', 'color.red': 'Rot', 'color.green': 'Grün', 'color.black': 'Schwarz',
    'color.pink': 'Rosa', 'color.empty': 'Leer', 'color.start': 'Start',
    letters: { 2: 'Ge', 3: 'R', 4: 'Gr', 5: 'S', 6: '★' },
    'status.noPink': 'Es gibt keine rosa Glyphe zu nehmen.',
    'status.startHole': 'Das Startfeld ist ein Loch.',
    'status.searching': 'Suche…',
    'status.progress': 'Suche… {k} Mio. Positionen geprüft',
    'status.progressBest': ', bisher beste Route: {n} Sprünge',
    'status.notFound': 'Keine Route gefunden ({s} s). Prüfe die Farben.',
    'status.found': '{n} Sprünge in {s} s gefunden.',
    'status.crashed': 'Der Löser ist abgestürzt: {m}',
    'status.cancelled': 'Abgebrochen.',
    'status.shotApplied': 'Spielfeld aus dem Screenshot gelesen. Korrigiere falsche Felder und klicke dann auf Lösen.',
    'cell.center': 'die Mitte',
    'cell.corners': ['die obere Ecke', 'die rechte Ecke', 'die untere Ecke', 'die linke Ecke'],
    'cell.free': 'ein freies Feld',
    'log.pink': 'Rosa: Regenbogen-Einohr −1 LP',
    'log.empty': 'leeres Feld',
    'log.push': 'geschoben {a}',
    'log.stuck': 'Schub blockiert',
    'log.shift': 'Nachbarn wechseln die Farbe',
    'log.back': 'zurück',
    'log.black': 'zu {c} geschickt',
    'step.start': 'Start. Erster Sprung: {a}',
    'step.jump': 'Sprung {s}/{total} (Runde {turn}, {i}/12) {a}: {d}',
    'step.done': '. Fertig!',
    'step.endTurn': '. Ende der Runde.',
  },

  pt: {
    title: 'Solucionador Iriskrônia',
    sub: 'Spray de felicidade: pinte os glifos e depois resolva.',
    boardLabel: 'Tabuleiro do combate',
    'hint.paint': 'Escolha uma cor e clique ou arraste sobre o tabuleiro.',
    'hint.replay': 'Reprodução: a seta mostra o próximo salto. Use ← → ou os botões.',
    'shot.title': 'A partir de uma captura de tela',
    'shot.desc': 'Pressione <kbd>Ctrl</kbd>+<kbd>V</kbd> em qualquer lugar da página para colar uma captura do combate, ou solte um arquivo de imagem aqui.',
    'shot.choose': 'Escolher imagem…',
    'shot.apply': 'Usar este tabuleiro',
    'shot.repick': 'Marcar os cantos de novo',
    'shot.check': 'Confira as letras nas casas e depois use este tabuleiro. Fora do lugar? Marque os cantos de novo.',
    'shot.click': 'Clique no centro da casa rosa {corner} ({n}/4).',
    'shot.corners': ['de cima', 'da direita', 'de baixo', 'da esquerda'],
    paint: 'Pintar',
    fill: 'Preencher tudo com a cor',
    fillEmpty: 'Preencher casas vazias',
    reset: 'Reiniciar tabuleiro',
    solve: 'Resolver',
    cancel: 'Cancelar',
    route: 'Rota',
    routeLen: '· {n} saltos, {t} turnos',
    turn: 'Turno {n}',
    'btn.first': 'Voltar ao início',
    'btn.prev': 'Anterior (←)',
    'btn.play': 'Reproduzir / pausar',
    'btn.next': 'Próximo (→)',
    'btn.last': 'Ir para o final',
    speed: 'Velocidade',
    speedValue: '{s} s / salto',
    'btn.resolveTitle': 'Usar o tabuleiro desta etapa como novo ponto de partida',
    'btn.resolve': 'Editar a partir desta etapa',
    'btn.close': 'Voltar à edição',
    rulesTitle: 'Regras usadas',
    rules: `<li>Cada salto avança uma casa (↗ ↘ ↙ ↖), nunca para um buraco nem para fora do tabuleiro.</li>
      <li><b>Amarelo</b> → fica vermelho e empurra você mais uma casa na mesma direção (você fica parado se estiver bloqueado).</li>
      <li><b>Vermelho</b> → fica verde; as 4 casas vizinhas mudam: Amarelo → Vermelho → Verde → Preto → Amarelo.</li>
      <li><b>Verde</b> → fica amarelo e faz você voltar um passo no seu caminho. Se essa casa também for verde, você volta de novo, e assim por diante.</li>
      <li><b>Preto</b> → fica vermelho e manda você de volta para a última casa sem glifo em que você esteve (o centro ou um canto já limpo).</li>
      <li><b>Rosa</b> → Iriskrônia −1 PV, a casa fica vazia.</li>
      <li>Toda casa em que você chega é ativada, inclusive depois de um empurrão ou de um recuo, então os efeitos se encadeiam.</li>
      <li>12 PA = 12 saltos por turno; passar o turno não muda nada.</li>`,
    'color.yellow': 'Amarelo', 'color.red': 'Vermelho', 'color.green': 'Verde', 'color.black': 'Preto',
    'color.pink': 'Rosa', 'color.empty': 'Vazia', 'color.start': 'Início',
    letters: { 2: 'A', 3: 'Vm', 4: 'Vd', 5: 'P', 6: '★' },
    'status.noPink': 'Não há nenhum glifo rosa para pegar.',
    'status.startHole': 'A casa inicial é um buraco.',
    'status.searching': 'Buscando…',
    'status.progress': 'Buscando… {k} mi posições verificadas',
    'status.progressBest': ', melhor até agora: {n} saltos',
    'status.notFound': 'Nenhuma rota encontrada ({s} s). Confira as cores.',
    'status.found': '{n} saltos encontrados em {s} s.',
    'status.crashed': 'O solucionador falhou: {m}',
    'status.cancelled': 'Cancelado.',
    'status.shotApplied': 'Tabuleiro lido da captura. Corrija as casas erradas e depois clique em Resolver.',
    'cell.center': 'o centro',
    'cell.corners': ['o canto de cima', 'o canto da direita', 'o canto de baixo', 'o canto da esquerda'],
    'cell.free': 'uma casa livre',
    'log.pink': 'Rosa: Iriskrônia −1 PV',
    'log.empty': 'casa vazia',
    'log.push': 'empurrado {a}',
    'log.stuck': 'empurrão bloqueado',
    'log.shift': 'as vizinhas mudam de cor',
    'log.back': 'recuo',
    'log.black': 'enviado para {c}',
    'step.start': 'Início. Primeiro salto: {a}',
    'step.jump': 'Salto {s}/{total} (turno {turn}, {i}/12) {a}: {d}',
    'step.done': '. Pronto!',
    'step.endTurn': '. Fim do turno.',
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
