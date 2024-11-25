import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { AntDesign } from '@expo/vector-icons';
import CriarTarefasScreen from './ui/screens/Tarefas/CriarTarefasScreen';
import ProjetosScreen from './ui/screens/Projetos/ProjetosScreen';
import ProjetoDetalhesScreen from './ui/screens/Projetos/ProjetoDetalhesScreen';
import CriarProjetoScreen from './ui/screens/Projetos/CriarProjetosScreen';
import EditarTarefasScreen from './ui/screens/Tarefas/EditarTarefasScreen';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Projetos">
        <Stack.Screen name="Projetos" component={ProjetosScreen} />
        <Stack.Screen name="Criar Tarefas" component={CriarTarefasScreen} />
        <Stack.Screen name="Criar Projetos" component={CriarProjetoScreen} />
        {/* <Stack.Screen name="Tarefas" component={TarefasScreen} /> */}
        <Stack.Screen name="Detalhes do Projeto" component={ProjetoDetalhesScreen} />
        <Stack.Screen name="Editar Tarefa" component={EditarTarefasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listaContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  projetoContainer: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  projetoTexto: {
    fontSize: 16,
    color: 'black',
  },
  botaoAdicionar: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderWidth: 1,
    borderColor: '#0079eb',
    borderRadius: 16,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});
