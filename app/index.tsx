import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function App() {
  const [distancia, setDistancia] = useState('');
  const [horas, setHoras] = useState('');
  const [minutos, setMinutos] = useState('');
  const [segundos, setSegundos] = useState('');
  const [resultado, setResultado] = useState('');

  function calcularPace() {
    const distanciaNumero = parseFloat(distancia.replace(',', '.'));
    const horasNumero = parseInt(horas || '0');
    const minutosNumero = parseInt(minutos || '0');
    const segundosNumero = parseInt(segundos || '0');

    if (!distanciaNumero || distanciaNumero <= 0) {
      Alert.alert('Atenção', 'Digite uma distância válida em quilômetros.');
      return;
    }

    const tempoTotalSegundos =
      horasNumero * 3600 + minutosNumero * 60 + segundosNumero;

    if (tempoTotalSegundos <= 0) {
      Alert.alert('Atenção', 'Digite um tempo válido de corrida.');
      return;
    }

    const paceEmSegundos = tempoTotalSegundos / distanciaNumero;

    const paceMinutos = Math.floor(paceEmSegundos / 60);
    const paceSegundos = Math.round(paceEmSegundos % 60);

    const paceFormatado = `${paceMinutos}:${paceSegundos
      .toString()
      .padStart(2, '0')} min/km`;

    setResultado(`Seu pace médio foi de ${paceFormatado}`);
  }

  function limparCampos() {
    setDistancia('');
    setHoras('');
    setMinutos('');
    setSegundos('');
    setResultado('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Calculadora de Pace do Corredor</Text>

      <Text style={styles.subtitulo}>
        Informe a distância e o tempo total da corrida.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Distância em km. Ex: 5"
        keyboardType="numeric"
        value={distancia}
        onChangeText={setDistancia}
      />

      <View style={styles.linhaTempo}>
        <TextInput
          style={styles.inputTempo}
          placeholder="Horas"
          keyboardType="numeric"
          value={horas}
          onChangeText={setHoras}
        />

        <TextInput
          style={styles.inputTempo}
          placeholder="Min"
          keyboardType="numeric"
          value={minutos}
          onChangeText={setMinutos}
        />

        <TextInput
          style={styles.inputTempo}
          placeholder="Seg"
          keyboardType="numeric"
          value={segundos}
          onChangeText={setSegundos}
        />
      </View>

      <TouchableOpacity style={styles.botao} onPress={calcularPace}>
        <Text style={styles.textoBotao}>Calcular Pace</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSecundario} onPress={limparCampos}>
        <Text style={styles.textoBotaoSecundario}>Limpar</Text>
      </TouchableOpacity>

      {resultado !== '' && (
        <View style={styles.cardResultado}>
          <Text style={styles.textoResultado}>{resultado}</Text>
        </View>
      )}

      <Text style={styles.rodape}>
        React Native + Expo + GitHub Actions
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#eef4ff'
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f3c88',
    marginBottom: 12
  },
  subtitulo: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 24
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  linhaTempo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18
  },
  inputTempo: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
    width: '31%',
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center'
  },
  botao: {
    backgroundColor: '#1f3c88',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12
  },
  textoBotao: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold'
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: '#1f3c88',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  textoBotaoSecundario: {
    color: '#1f3c88',
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardResultado: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#1f3c88',
    marginBottom: 24
  },
  textoResultado: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center'
  },
  rodape: {
    textAlign: 'center',
    fontSize: 13,
    color: '#666'
  }
});