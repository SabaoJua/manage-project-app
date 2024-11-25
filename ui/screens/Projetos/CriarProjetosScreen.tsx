import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { createProjeto } from '../../../src/network/api/projets/create-project';

export default function CriarProjetoScreen({ navigation }) {
  const [nomeProjeto, setNomeProjeto] = useState('');
  const [statusProjeto, setStatusProjeto] = useState('aguardando');
  const [duracao, setDuracao] = useState('');
  
  const salvarProjeto = async () => {
    if (!nomeProjeto || !duracao) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        return;
    }

    const novoProjeto = {
        name: nomeProjeto.trim(),
        status: statusProjeto.trim(),
        duration: parseInt(duracao), 
    };

    console.log('Dados formatados para envio:', novoProjeto);

    try {
        const response = await createProjeto(novoProjeto);
        console.log('Projeto Criado:', response);
        Alert.alert('Sucesso', 'Projeto criado com sucesso!');
        navigation.goBack();
    } catch (error) {
        Alert.alert('Erro', 'Falha ao criar o projeto. Tente novamente.');
    }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Novo Projeto</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nome do Projeto</Text>
        <TextInput
          style={styles.input}
          value={nomeProjeto}
          onChangeText={setNomeProjeto}
          placeholder="Digite o nome do projeto"
        />

        <Text style={styles.label}>Status</Text>
        <Picker
          selectedValue={statusProjeto}
          style={styles.inputPicker}
          onValueChange={(itemValue) => setStatusProjeto(itemValue)}
        >
          <Picker.Item label="Aguardando" value="aguardando" />
          <Picker.Item label="Em Desenvolvimento" value="em desenvolimento" />
          <Picker.Item label="Desenvolvido" value="desenvolvido" />
        </Picker>

        <Text style={styles.label}>Duração (em dias)</Text>
        <TextInput
          style={styles.input}
          value={duracao}
          onChangeText={setDuracao}
          placeholder="Digite a duração em dias"
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity onPress={salvarProjeto} style={styles.botaoSalvar}>
        <Text style={styles.botaoTexto}>Salvar Projeto</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  inputPicker: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  botaoSalvar: {
    backgroundColor: '#4A90E2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
