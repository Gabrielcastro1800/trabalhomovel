import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';


const imagens = [
  require('./assets/1.png'),
  require('./assets/2.png'),
  require('./assets/3.png'),
  require('./assets/4.png'),
  require('./assets/5.png'),
  require('./assets/6.png'),
  require('./assets/7.png'),
  require('./assets/8.png'),
  require('./assets/10.png'),
  require('./assets/11.png'),
  require('./assets/12.png'),
  require('./assets/13.png'),
  require('./assets/14.png'),
  require('./assets/15.png'),
  require('./assets/16.png'),

];

const embaralharCartas = () => {
  const duplicadas = [...imagens, ...imagens];
  return duplicadas
    .map(img => ({
      imagem: img,
      id: Math.random().toString(),
      virada: false,
      combinada: false,
    }))
    .sort(() => Math.random() - 0.5);
};

export default function App() {
  const [cartas, setCartas] = useState(embaralharCartas());
  const [selecionadas, setSelecionadas] = useState([]);

  useEffect(() => {
    if (selecionadas.length === 2) {
      const [c1, c2] = selecionadas;
      if (c1.imagem === c2.imagem) {
        setCartas(prev =>
          prev.map(c =>
            c.imagem === c1.imagem ? { ...c, combinada: true } : c
          )
        );
      }

      setTimeout(() => {
        setCartas(prev =>
          prev.map(c =>
            c.id === c1.id || c.id === c2.id ? { ...c, virada: false } : c
          )
        );
        setSelecionadas([]);
      }, 1000);
    }
  }, [selecionadas]);

  const virarCarta = (id) => {
    const carta = cartas.find(c => c.id === id);
    if (!carta || carta.virada || carta.combinada || selecionadas.length >= 2) return;

    setCartas(prev =>
      prev.map(c =>
        c.id === id ? { ...c, virada: true } : c
      )
    );
    setSelecionadas(prev => [...prev, carta]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Jogo da Memória do Shrek</Text>
      <View style={styles.grid}>
        {cartas.map(carta => (
          <TouchableOpacity
            key={carta.id}
            onPress={() => virarCarta(carta.id)}
            style={styles.card}
            activeOpacity={0.8}
          >
            {carta.virada || carta.combinada ? (
              <Image source={carta.imagem} style={styles.img} />
            ) : (
              <View style={styles.backCard} />
            )}
            
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0', alignItems: 'center', paddingTop: 50 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',         
    justifyContent: 'center', 
    width: '90%',             
  },
  card: {
    width: 150,
    height: 150,
    margin: 35,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backCard: {
    backgroundColor: '#999',
    flex: 1,
  },
});
