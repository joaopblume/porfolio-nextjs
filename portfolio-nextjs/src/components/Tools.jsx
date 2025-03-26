import { useState, useEffect, useRef } from 'react';
import styles from './styles/Tools.module.css';

const ToolsPiano = () => {
  const [activeKeys, setActiveKeys] = useState({}); // Change to an object to track multiple active keys
  const [displayBlocks, setDisplayBlocks] = useState([]);
  const audioRefs = useRef({});
  const pianoRef = useRef(null);

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
    // Grupo 1: Frontend Development (Azul)
    { tool: 'React', note: 'C', octave: 3, isBlack: false, group: 'Frontend Development', color: '#61DAFB' },
    { tool: 'Next.js', note: 'C#', octave: 3, isBlack: true, group: 'Frontend Development', color: '#61DAFB' },
    { tool: 'Selenium', note: 'D', octave: 3, isBlack: false, group: 'Frontend Development', color: '#61DAFB' },
    { tool: 'C#', note: 'D#', octave: 3, isBlack: true, group: 'Frontend Development', color: '#61DAFB' },
    { tool: 'Node', note: 'E', octave: 3, isBlack: false, group: 'Frontend Development', color: '#61DAFB' },
    { tool: 'REST API', note: 'F', octave: 3, isBlack: false, group: 'Frontend Development', color: '#61DAFB' },
    { tool: 'Python', note: 'F#', octave: 3, isBlack: true, group: 'Frontend Development', color: '#61DAFB' },
    { tool: 'Django', note: 'G', octave: 3, isBlack: false, group: 'Frontend Development', color: '#61DAFB' },
    
    // Grupo 2: Databases (Laranja)
    { tool: 'Oracle', note: 'G#', octave: 3, isBlack: true, group: 'Databases', color: '#F29111' },
    { tool: 'MySQL', note: 'A', octave: 3, isBlack: false, group: 'Databases', color: '#F29111' },
    { tool: 'PostgreSQL', note: 'A#', octave: 3, isBlack: true, group: 'Databases', color: '#F29111' },
    { tool: 'MongoDB', note: 'B', octave: 3, isBlack: false, group: 'Databases', color: '#F29111' },
    { tool: 'Redis', note: 'C', octave: 4, isBlack: false, group: 'Databases', color: '#F29111' },
    { tool: 'DynamoDB', note: 'C#', octave: 4, isBlack: true, group: 'Databases', color: '#F29111' },
    { tool: 'Hive', note: 'D', octave: 4, isBlack: false, group: 'Databases', color: '#F29111' },
    { tool: 'ElasticSearch', note: 'D#', octave: 4, isBlack: true, group: 'Databases', color: '#F29111' },
    
    // Grupo 3: Cloud (Amarelo)
    { tool: 'AWS', note: 'E', octave: 4, isBlack: false, group: 'Cloud', color: '#FF9900' },
    { tool: 'Azure', note: 'F', octave: 4, isBlack: false, group: 'Cloud', color: '#FF9900' },
    { tool: 'OCI', note: 'F#', octave: 4, isBlack: true, group: 'Cloud', color: '#FF9900' },
    { tool: 'Digital Ocean', note: 'G', octave: 4, isBlack: false, group: 'Cloud', color: '#FF9900' },
    { tool: 'GCP', note: 'G#', octave: 4, isBlack: true, group: 'Cloud', color: '#FF9900' },
    { tool: 'Linux', note: 'A', octave: 4, isBlack: false, group: 'Cloud', color: '#FF9900' },
    { tool: 'VMWare', note: 'A#', octave: 4, isBlack: true, group: 'Cloud', color: '#FF9900' },
    { tool: 'OLVM', note: 'B', octave: 4, isBlack: false, group: 'Cloud', color: '#FF9900' },
    
    // Grupo 4: DevOps (Azul escuro)
    { tool: 'Kubernetes', note: 'C', octave: 5, isBlack: false, group: 'DevOps', color: '#2496ED' },
    { tool: 'Docker', note: 'C#', octave: 5, isBlack: true, group: 'DevOps', color: '#2496ED' },
    { tool: 'Jenkins', note: 'D', octave: 5, isBlack: false, group: 'DevOps', color: '#2496ED' },
    { tool: 'Git', note: 'D#', octave: 5, isBlack: true, group: 'DevOps', color: '#2496ED' },
    { tool: 'Nginx', note: 'E', octave: 5, isBlack: false, group: 'DevOps', color: '#2496ED' },
    { tool: 'Zabbix', note: 'F', octave: 5, isBlack: false, group: 'DevOps', color: '#2496ED' },
    { tool: 'Grafana', note: 'F#', octave: 5, isBlack: true, group: 'DevOps', color: '#2496ED' },
    { tool: 'Shell Script', note: 'G', octave: 5, isBlack: false, group: 'DevOps', color: '#2496ED' },
    
    // Grupo 5: Data & AI (Vermelho)
    { tool: 'Spark', note: 'G#', octave: 5, isBlack: true, group: 'Data & AI', color: '#E25A1C' },
    { tool: 'Apache Airflow', note: 'A', octave: 5, isBlack: false, group: 'Data & AI', color: '#E25A1C' },
    { tool: 'Apache HOP', note: 'A#', octave: 5, isBlack: true, group: 'Data & AI', color: '#E25A1C' },
    { tool: 'Oracle APEX', note: 'B', octave: 5, isBlack: false, group: 'Data & AI', color: '#E25A1C' },
    { tool: 'LLMs', note: 'C', octave: 6, isBlack: false, group: 'Data & AI', color: '#E25A1C' },
    { tool: 'RAG', note: 'C#', octave: 6, isBlack: true, group: 'Data & AI', color: '#E25A1C' },
    { tool: 'Fine Tuning', note: 'D', octave: 6, isBlack: false, group: 'Data & AI', color: '#E25A1C' },
    { tool: 'Transfer Learning', note: 'D#', octave: 6, isBlack: true, group: 'Data & AI', color: '#E25A1C' }
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

  return (
    <div className={`${styles.pianoContainer} ${styles.pianoRoot}`}>
      {/* Display Blocks Container */}
      <div className={styles.displayBlocksContainer}>
        {displayBlocks.map((block) => (
          <div 
            key={block.id} 
            className={styles.displayBlock}
            style={{ 
              borderColor: block.tool.color,
              backgroundColor: `${block.tool.color}10` // Cor com 10% de opacidade
            }}
          >
            <div className={styles.displayBlockTool}>{block.tool.tool}</div>
            <div className={styles.displayBlockGroup} style={{ color: block.tool.color }}>
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
              className={`${styles.whiteKey} ${activeKeys[tool.id] ? styles.activeWhite : ''}`}
              style={{
                '--key-color': tool.color,
              }}
              onClick={() => handleKeyClick(tool)}
              onMouseDown={() => handleKeyClick(tool)}
              // Using inline style for absolute certainty
              data-active={activeKeys[tool.id] ? "true" : "false"}
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
                className={`${styles.blackKey} ${activeKeys[tool.id] ? styles.activeBlack : ''}`}
                style={{
                  '--key-color': tool.color,
                  left: `calc(${position} * var(--white-key-width) + (var(--white-key-width) / 2))`
                }}
                onClick={() => handleKeyClick(tool)}
                onMouseDown={() => handleKeyClick(tool)}
                // Using inline attribute for absolute certainty
                data-active={activeKeys[tool.id] ? "true" : "false"}
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