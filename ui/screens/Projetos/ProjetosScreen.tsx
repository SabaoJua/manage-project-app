import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { renderProjeto } from "../../components/reder-project"; // Atualize o caminho, se necessário
import { useEffect, useState } from "react";
import { config } from "../../../config";
import { fetchProjetos } from "../../../src/network/api/projets/list-projects";

export default function ProjetosScreen({ navigation }) {


  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const getProjects = async () => {
        try {
          setLoading(true); // Exibe o estado de carregamento ao voltar
          const data = await fetchProjetos(); 
          setProjetos(data);
        } catch (error) {
          console.error('Erro ao buscar os projetos:', error);
        } finally {
          setLoading(false);
        }
      };
  
      getProjects();
    });
  
    // Limpa o listener ao desmontar
    return unsubscribe;
  }, [navigation]);
  

 /*  const projetos = [
    { id: '1', name: 'Projeto 1', descricao: 'Projeto interessante com tarefas legais', status: 'Aguardando' },
    { id: '2', name: 'Projeto B', descricao: 'Projeto de desenvolvimento em andamento', status: 'Em Desenvolvimento' },
    { id: '3', name: 'Projeto C', descricao: 'Projeto finalizado e pronto para revisão', status: 'Desenvolvido' },
  ] */;

  const handleProjetoPress = (projeto) => {
    navigation.navigate('Detalhes do Projeto', { projeto });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <FlatList
        data={projetos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProjetoPress(item)}>
            {renderProjeto({ item })}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listaContainer}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate('Criar Projetos')}
        style={styles.botaoAdicionar}
      >
        <AntDesign name="plus" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  listaContainer: {
    paddingVertical: 10,
  },
  botaoAdicionar: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 50,
    padding: 16,
    backgroundColor: '#0079eb',
  },
});
