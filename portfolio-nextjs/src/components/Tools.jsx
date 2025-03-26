import { useState, useEffect, useRef } from 'react';
import styles from './styles/Tools.module.css';

const ToolsPiano = () => {
  const [activeKeys, setActiveKeys] = useState({});
  const [displayBlocks, setDisplayBlocks] = useState([]);
  const audioRefs = useRef({});
  const pianoRef = useRef(null);

  // Songs collection - Add new songs here
  const pianoSongs = [
    {
      id: 'devops-pipeline',
      title: 'DevOps CI/CD Pipeline',
      description: 'A CI/CD pipeline using Kubernetes Pods in a virtualized Linux environment orchestrated by Jenkins',
      notes: [
        { note: 'C5', delay: 0 },     // Kubernetes
        { note: 'D5', delay: 800 },   // Jenkins
        { note: 'B4', delay: 1600 },  // Linux
        { note: 'A4', delay: 2400 }   // VMWare
      ]
    },
    {
      id: 'data-processing',
      title: 'What about a C Major?',
      description: 'Backend in Django with its frontend in React, check how beutifil is this chord!',
      notes: [
        { note: 'C3', delay: 0 },      // React
        { note: 'E3', delay: 12 },    // Node
        { note: 'G3', delay: 30},   // Django
      ]
    },
    {
      id: 'api-database-int',
      title: 'API-Database Integration',
      description: 'Need a conitinious and confident syncrhonization between your API and Database? Here is the melody!',
      notes: [
        { note: 'F3', delay: 0 },      // Rest API
        { note: 'A3', delay: 12 },   // Mysql
        { note: 'C4', delay: 30 },   // Redis
        { note: 'G5', delay: 1000 },  // Shell Script
        { note: 'A5', delay: 1550 }   // Airflow
      ]
    }
    // Add more songs here as needed!
  ];

  const [currentSong, setCurrentSong] = useState(pianoSongs[0]);
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);
  const [currentDemoNote, setCurrentDemoNote] = useState(null);
  const demoTimeoutRef = useRef(null);

  const toolGroups = [
    { name: 'Fullstack Development', color: '#801245' },
    { name: 'Databases', color: '#FFDAD5' },
    { name: 'Cloud and Virtualization', color: '#dcdbaf' },
    { name: 'DevOps', color: '#4f3624' },
    { name: 'Data & AI', color: '#7a7a79' }
  ];

  // Mapeamento de teclas do teclado para notas do piano
  const keyboardMap = {
    'q': 'C3', 'w': 'D3', 'e': 'E3', 'r': 'F3', 't': 'G3', 'y': 'A3', 'u': 'B3',
    'i': 'C4', 'o': 'D4', 'p': 'E4', '[': 'F4', ']': 'G4', 'a': 'A4', 's': 'B4',
    'd': 'C5', 'f': 'D5', 'g': 'E5', 'h': 'F5', 'j': 'G5', 'k': 'A5', 'l': 'B5',
    ';': 'C6', '\'': 'D6',
    '2': 'C#3', '3': 'D#3', '5': 'F#3', '6': 'G#3', '7': 'A#3',
    '9': 'C#4', '0': 'D#4', '=': 'F#4', 'z': 'G#4', 'x': 'A#4',
    'v': 'C#5', 'b': 'D#5', 'n': 'F#5', 'm': 'G#5', ',': 'A#5',
    '.': 'C#6', '/': 'D#6'
  };

  // Inverter o mapeamento para encontrar a tecla do teclado a partir da nota
  const noteToKeyMap = {};
  Object.entries(keyboardMap).forEach(([key, note]) => {
    noteToKeyMap[note] = key.toUpperCase();
  });

  // Mapeamento de todas as ferramentas para teclas de piano
  const tools = [
    // Grupo 1: Fullstack Development (Rosa)
    { tool: 'React', note: 'C', octave: 3, isBlack: false, group: 'Fullstack Development', color: '#801245' },
    { tool: 'Next.js', note: 'C#', octave: 3, isBlack: true, group: 'Fullstack Development', color: '#801245' },
    { tool: 'Selenium', note: 'D', octave: 3, isBlack: false, group: 'Fullstack Development', color: '#801245' },
    { tool: 'C#', note: 'D#', octave: 3, isBlack: true, group: 'Fullstack Development', color: '#801245' },
    { tool: 'Node', note: 'E', octave: 3, isBlack: false, group: 'Fullstack Development', color: '#801245' },
    { tool: 'REST API', note: 'F', octave: 3, isBlack: false, group: 'Fullstack Development', color: '#801245' },
    { tool: 'Python', note: 'F#', octave: 3, isBlack: true, group: 'Fullstack Development', color: '#801245' },
    { tool: 'Django', note: 'G', octave: 3, isBlack: false, group: 'Fullstack Development', color: '#801245' },

    // Grupo 2: Databases (Bege)
    { tool: 'Oracle', note: 'G#', octave: 3, isBlack: true, group: 'Databases', color: '#FFDAD5' },
    { tool: 'MySQL', note: 'A', octave: 3, isBlack: false, group: 'Databases', color: '#FFDAD5' },
    { tool: 'PostgreSQL', note: 'A#', octave: 3, isBlack: true, group: 'Databases', color: '#FFDAD5' },
    { tool: 'MongoDB', note: 'B', octave: 3, isBlack: false, group: 'Databases', color: '#FFDAD5' },
    { tool: 'Redis', note: 'C', octave: 4, isBlack: false, group: 'Databases', color: '#FFDAD5' },
    { tool: 'DynamoDB', note: 'C#', octave: 4, isBlack: true, group: 'Databases', color: '#FFDAD5' },
    { tool: 'Hive', note: 'D', octave: 4, isBlack: false, group: 'Databases', color: '#FFDAD5' },
    { tool: 'ElasticSearch', note: 'D#', octave: 4, isBlack: true, group: 'Databases', color: '#FFDAD5' },

    // Grupo 3: Cloud and Virtualization (Amarelo esverdeado)
    { tool: 'AWS', note: 'E', octave: 4, isBlack: false, group: 'Cloud and Virtualization', color: '#dcdbaf' },
    { tool: 'Azure', note: 'F', octave: 4, isBlack: false, group: 'Cloud and Virtualization', color: '#dcdbaf' },
    { tool: 'OCI', note: 'F#', octave: 4, isBlack: true, group: 'Cloud and Virtualization', color: '#dcdbaf' },
    { tool: 'Digital Ocean', note: 'G', octave: 4, isBlack: false, group: 'Cloud and Virtualization', color: '#dcdbaf' },
    { tool: 'GCP', note: 'G#', octave: 4, isBlack: true, group: 'Cloud and Virtualization', color: '#dcdbaf' },
    { tool: 'Linux', note: 'A', octave: 4, isBlack: false, group: 'Cloud and Virtualization', color: '#dcdbaf' },
    { tool: 'VMWare', note: 'A#', octave: 4, isBlack: true, group: 'Cloud and Virtualization', color: '#dcdbaf' },
    { tool: 'OLVM', note: 'B', octave: 4, isBlack: false, group: 'Cloud and Virtualization', color: '#dcdbaf' },

    // Grupo 4: DevOps (Marro claro)
    { tool: 'Kubernetes', note: 'C', octave: 5, isBlack: false, group: 'DevOps', color: '#4f3624' },
    { tool: 'Docker', note: 'C#', octave: 5, isBlack: true, group: 'DevOps', color: '#4f3624' },
    { tool: 'Jenkins', note: 'D', octave: 5, isBlack: false, group: 'DevOps', color: '#4f3624' },
    { tool: 'Git', note: 'D#', octave: 5, isBlack: true, group: 'DevOps', color: '#4f3624' },
    { tool: 'Nginx', note: 'E', octave: 5, isBlack: false, group: 'DevOps', color: '#4f3624' },
    { tool: 'Zabbix', note: 'F', octave: 5, isBlack: false, group: 'DevOps', color: '#4f3624' },
    { tool: 'Grafana', note: 'F#', octave: 5, isBlack: true, group: 'DevOps', color: '#4f3624' },
    { tool: 'Shell Script', note: 'G', octave: 5, isBlack: false, group: 'DevOps', color: '#4f3624' },

    // Grupo 5: Data & AI (Cinza Claro)
    { tool: 'Spark', note: 'G#', octave: 5, isBlack: true, group: 'Data & AI', color: '#7a7a79' },
    { tool: 'Apache Airflow', note: 'A', octave: 5, isBlack: false, group: 'Data & AI', color: '#7a7a79' },
    { tool: 'Apache HOP', note: 'A#', octave: 5, isBlack: true, group: 'Data & AI', color: '#7a7a79' },
    { tool: 'Oracle APEX', note: 'B', octave: 5, isBlack: false, group: 'Data & AI', color: '#7a7a79' },
    { tool: 'LLMs', note: 'C', octave: 6, isBlack: false, group: 'Data & AI', color: '#7a7a79' },
    { tool: 'RAG', note: 'C#', octave: 6, isBlack: true, group: 'Data & AI', color: '#7a7a79' },
    { tool: 'Fine Tuning', note: 'D', octave: 6, isBlack: false, group: 'Data & AI', color: '#7a7a79' },
    { tool: 'Transfer Learning', note: 'D#', octave: 6, isBlack: true, group: 'Data & AI', color: '#7a7a79' }
  ];

  // Adiciona informações extras a cada ferramenta
  const toolsWithMeta = tools.map(tool => {
    const noteWithOctave = `${tool.note}${tool.octave}`;
    return {
      ...tool,
      noteWithOctave,
      keyboardKey: noteToKeyMap[noteWithOctave] || '',
      id: `${tool.note}${tool.octave}` // Add a unique ID for each tool
    };
  });

  // Separar teclas brancas e pretas para renderização
  const whiteKeys = toolsWithMeta.filter(tool => !tool.isBlack);
  const blackKeys = toolsWithMeta.filter(tool => tool.isBlack);

  // Função para obter o nome do arquivo de som
  const getSoundFileName = (note, octave) => {
    // Substitui o # por b para corresponder aos nomes dos arquivos de som
    if (note.includes('#')) {
      const noteMap = {
        'C#': 'Db',
        'D#': 'Eb',
        'F#': 'Gb',
        'G#': 'Ab',
        'A#': 'Bb'
      };
      return `${noteMap[note]}${octave}`;
    }
    return `${note}${octave}`;
  };

  // Função para determinar a cor do texto com base no grupo
  const getTextColorForGroup = (group, defaultColor) => {
    // Grupos com cores claras precisam de texto mais escuro
    if (group === 'Cloud and Virtualization') {
      return '#8B5A00'; // Marrom escuro para o grupo Cloud and Virtualization
    } else if (group === 'Databases' && defaultColor === '#FFDAD5') {
      return '#8B4513'; // Marrom escuro para Databases se for muito claro
    }
    // Para outros grupos, usar a cor original
    return defaultColor;
  };

  // Função para obter a cor de fundo com opacidade ajustada
  const getBackgroundColor = (color) => {
    // Usa uma opacidade menor para cores claras e maior para cores escuras
    if (color === '#FF9900' || color === '#F29111') {
      return `${color}20`; // 12.5% de opacidade para cores claras
    }
    return `${color}10`; // 6.25% de opacidade para as demais
  };

  // Flexible song player function
  const playDemoSequence = (songId) => {
    if (isPlayingDemo) return;
    
    // Find the song to play
    const songToPlay = songId 
      ? pianoSongs.find(song => song.id === songId) 
      : currentSong;
    
    if (!songToPlay) return;
    
    // Update current song if needed
    if (songId) {
      setCurrentSong(songToPlay);
    }
    
    setIsPlayingDemo(true);
    
    // Clear any existing timeout
    if (demoTimeoutRef.current) {
      clearTimeout(demoTimeoutRef.current);
    }
    
    // Play each note in sequence
    songToPlay.notes.forEach((item, index) => {
      setTimeout(() => {
        const tool = toolsWithMeta.find(t => `${t.note}${t.octave}` === item.note);
        
        if (tool) {
          setCurrentDemoNote(tool.id);
          playSound(tool);
          addDisplayBlock(tool);
          
          // Clear the highlight after 500ms
          setTimeout(() => {
            setCurrentDemoNote(null);
          }, 500);
        }
        
        // If it's the last note, set isPlayingDemo to false after it completes
        if (index === songToPlay.notes.length - 1) {
          demoTimeoutRef.current = setTimeout(() => {
            setIsPlayingDemo(false);
          }, 1000);
        }
      }, item.delay);
    });
  };

  // Piano presentation component with song selector
  const renderPianoPresentation = () => {
    return (
      <div className={styles.presentationContainer}>
        <h2 className={styles.presentationTitle}>Skills Reimagined Through Music</h2>
        
        <p className={styles.presentationText}>
          Listing skills is commonplace. How about a touch of music instead? Each piano key represents a tool in my technology arsenal.
        </p>
        
        <div className={styles.songSelector}>
          <p className={styles.songSelectorLabel}>Choose a tech melody:</p>
          <div className={styles.songOptions}>
            {pianoSongs.map((song) => (
              <button 
                key={song.id}
                className={`${styles.songOption} ${currentSong.id === song.id ? styles.activeSong : ''}`}
                onClick={() => setCurrentSong(song)}
                disabled={isPlayingDemo}
              >
                {song.title}
              </button>
            ))}
          </div>
        </div>
        
        <p className={styles.presentationQuestion}>
          {currentSong.description}
        </p>
        
        <button 
          className={`${styles.playDemoButton} ${isPlayingDemo ? styles.playingDemo : ''}`}
          onClick={() => playDemoSequence()}
          disabled={isPlayingDemo}
        >
          {isPlayingDemo ? 'Playing...' : 'Play Demo'}
          {!isPlayingDemo && <span className={styles.playIcon}>▶</span>}
          {isPlayingDemo && <span className={styles.loadingDots}><span>.</span><span>.</span><span>.</span></span>}
        </button>
        
        <p className={styles.presentationHint}>
          Feel free to play your own tech melody using your keyboard or by clicking the piano keys below!
        </p>
      </div>
    );
  };

  // Pré-carrega os sons quando o componente é montado
  useEffect(() => {
    tools.forEach(tool => {
      const soundFile = getSoundFileName(tool.note, tool.octave);
      const audio = new Audio(`/piano_sounds/${soundFile}.mp3`);
      audioRefs.current[`${tool.note}${tool.octave}`] = audio;
    });

    // Adiciona event listeners para teclas do teclado
    const handleKeyDown = (event) => {
      const key = event.key.toLowerCase();
      if (keyboardMap[key] && !event.repeat) { // Avoid repeat key events
        const noteWithOctave = keyboardMap[key];
        const tool = toolsWithMeta.find(t => `${t.note}${t.octave}` === noteWithOctave);
        if (tool) {
          // Mark this key as active
          setActiveKeys(prev => ({
            ...prev,
            [tool.id]: tool
          }));

          playSound(tool);
          addDisplayBlock(tool);
        }
      }
    };

    const handleKeyUp = (event) => {
      const key = event.key.toLowerCase();
      if (keyboardMap[key]) {
        const noteWithOctave = keyboardMap[key];
        const tool = toolsWithMeta.find(t => `${t.note}${t.octave}` === noteWithOctave);
        if (tool) {
          // Remove this key from active keys
          setActiveKeys(prev => {
            const newState = { ...prev };
            delete newState[tool.id];
            return newState;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Limpeza quando o componente é desmontado
    return () => {
      Object.values(audioRefs.current).forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
      });
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Adiciona um novo bloco de exibição
  const addDisplayBlock = (tool) => {
    const newBlock = {
      id: Date.now(),
      tool: tool
    };

    setDisplayBlocks(prev => [...prev, newBlock]);

    // Remove o bloco após 3 segundos
    setTimeout(() => {
      setDisplayBlocks(prev => prev.filter(block => block.id !== newBlock.id));
    }, 3000);
  };

  const playSound = (tool) => {
    try {
      const audioKey = `${tool.note}${tool.octave}`;
      const audio = audioRefs.current[audioKey];
      if (audio) {
        audio.currentTime = 0; // Reinicia o áudio se já estiver tocando
        audio.play().catch(e => console.error("Erro ao tocar o som:", e));
      }
    } catch (error) {
      console.error("Erro ao reproduzir o som:", error);
    }
  };

  const handleKeyClick = (tool) => {
    // Add this key to active keys
    setActiveKeys(prev => ({
      ...prev,
      [tool.id]: tool
    }));

    playSound(tool);
    addDisplayBlock(tool);

    // Remove the active state after 300ms
    setTimeout(() => {
      setActiveKeys(prev => {
        const newState = { ...prev };
        delete newState[tool.id];
        return newState;
      });
    }, 300);
  };

  // Calcula a posição de uma tecla preta com base na nota e oitava
  const getBlackKeyPosition = (note, octave) => {
    // Mapeamento de notas pretas para suas posições relativas
    const positionMap = {
      'C#': 0,
      'D#': 1,
      'F#': 2,
      'G#': 3,
      'A#': 4,
    };

    // Ajuste de posição para cada nota específica
    const adjustedPosition = positionMap[note];

    // Converter para número de índice global (considerando todas as oitavas)
    // Cada oitava tem 7 teclas brancas
    const octaveOffset = (octave - 3) * 7;

    // Ajustes específicos para cada tipo de nota preta
    let position;
    if (note === 'C#') {
      position = octaveOffset + 0.5;
    } else if (note === 'D#') {
      position = octaveOffset + 1.5;
    } else if (note === 'F#') {
      position = octaveOffset + 3.5;
    } else if (note === 'G#') {
      position = octaveOffset + 4.5;
    } else if (note === 'A#') {
      position = octaveOffset + 5.5;
    }

    return position;
  };

  const renderLegend = () => {
    return (
      <div className={styles.legendContainer}>
        <div className={styles.legendTitle}>Skills & Tools</div>
        <div className={styles.legendItems}>
          {toolGroups.map((group, index) => (
            <div key={index} className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ backgroundColor: group.color }}
              ></div>
              <div className={styles.legendText}>{group.name}</div>
              <div className={styles.legendTooltip}>
                {getGroupTools(group.name).map(tool => tool.tool).join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper function to get tools for each group
  const getGroupTools = (groupName) => {
    return tools.filter(tool => tool.group === groupName);
  };

  return (
    <div className={`${styles.pianoContainer} ${styles.pianoRoot}`}>
      {renderPianoPresentation()}
      {renderLegend()}
      {/* Display Blocks Container */}
      <div className={styles.displayBlocksContainer}>
        {displayBlocks.map((block) => (
          <div
            key={block.id}
            className={styles.displayBlock}
            style={{
              borderColor: block.tool.color,
              backgroundColor: getBackgroundColor(block.tool.color)
            }}
          >
            <div className={styles.displayBlockTool}>{block.tool.tool}</div>
            <div
              className={styles.displayBlockGroup}
              style={{
                color: getTextColorForGroup(block.tool.group, block.tool.color),
                fontWeight: block.tool.group === 'Cloud and Virtualization' || block.tool.group === 'Databases' ? '600' : '500'
              }}
            >
              {block.tool.group}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.piano} ref={pianoRef}>
        <div className={styles.keyContainer}>
          {/* Renderiza as teclas brancas primeiro como base */}
          {whiteKeys.map((tool, index) => (
            <div
              key={`white-${index}`}
              className={`${styles.whiteKey} ${(activeKeys[tool.id] || currentDemoNote === tool.id) ? styles.activeWhite : ''}`}
              style={{
                '--key-color': tool.color,
              }}
              onClick={() => handleKeyClick(tool)}
              data-active={(activeKeys[tool.id] || currentDemoNote === tool.id) ? "true" : "false"}
            >
              {tool.keyboardKey && (
                <div className={styles.keyboardKey}>{tool.keyboardKey}</div>
              )}
              <div className={styles.noteName}>{`${tool.note}${tool.octave}`}</div>
            </div>
          ))}

          {/* Renderiza as teclas pretas por cima */}
          {blackKeys.map((tool, index) => {
            // Calcula a posição relativa desta tecla preta
            const position = getBlackKeyPosition(tool.note, tool.octave);

            return (
              <div
                key={`black-${index}`}
                className={`${styles.blackKey} ${(activeKeys[tool.id] || currentDemoNote === tool.id) ? styles.activeBlack : ''}`}
                style={{
                  '--key-color': tool.color,
                  left: `calc(${position} * var(--white-key-width) + (var(--white-key-width) / 2))`
                }}
                onClick={() => handleKeyClick(tool)}
                data-active={(activeKeys[tool.id] || currentDemoNote === tool.id) ? "true" : "false"}
              >
                {tool.keyboardKey && (
                  <div className={styles.keyboardKeyBlack}>{tool.keyboardKey}</div>
                )}
                <div className={styles.noteNameBlack}>{`${tool.note}${tool.octave}`}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolsPiano;