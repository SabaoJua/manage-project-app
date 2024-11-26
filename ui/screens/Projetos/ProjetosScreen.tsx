import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { renderProjeto } from "../../components/reder-project";
import { useEffect, useState } from "react";
import { fetchProjetos } from "../../../src/network/api/projets/list-projects";

export default function ProjetosScreen({ navigation } : {navigation : any}) {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("aguardando");

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      const getProjects = async () => {
        try {
          setLoading(true);
          const data = await fetchProjetos();
          setProjetos(data);
        } catch (error) {
          console.error("Erro ao buscar os projetos:", error);
        } finally {
          setLoading(false);
        }
      };

      getProjects();
    });

    return unsubscribe;
  }, [navigation]);

  const handleProjetoPress = (projeto : any) => {
    navigation.navigate("Detalhes do Projeto", { projeto });
  };

  const projetosFiltrados = projetos.filter((projeto) => projeto.status === filtro);

  const contagemProjetos = {
    aguardando: projetos.filter((projeto) => projeto.status === "aguardando").length,
    "em desenvolvimento": projetos.filter(
      (projeto) => projeto.status === "em desenvolvimento"
    ).length,
    desenvolvido: projetos.filter((projeto) => projeto.status === "desenvolvido").length,
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.filtroContainer}>
        {["aguardando", "em desenvolvimento", "desenvolvido"].map((status) => (
          <TouchableOpacity
            key={status}
            style={[
              styles.botaoFiltro,
              filtro === status && styles.botaoFiltroAtivo,
            ]}
            onPress={() => setFiltro(status)}
          >
            <View style={styles.botaoFiltroConteudo}>
              <Text
                style={[
                  styles.textoFiltro,
                  filtro === status && styles.textoFiltroAtivo,
                ]}
              >
                {status.replace("_", " ")}
              </Text>
              <View style={styles.badge}>
                <Text style={styles.badgeTexto}>
                  {contagemProjetos[status]}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={projetosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProjetoPress(item)}>
            {renderProjeto({ item })}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listaContainer}
      />

      <TouchableOpacity
        onPress={() => navigation.navigate("Criar Projetos")}
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
    backgroundColor: "#f5f5f5",
  },
  listaContainer: {
    paddingVertical: 10,
  },
  filtroContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  botaoFiltro: {
    // flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    paddingHorizontal: 16,
    backgroundColor: "transparent",
  },
  botaoFiltroConteudo: {
    flexDirection: "row",
    alignItems: "center",
  },
  botaoFiltroAtivo: {
    backgroundColor: "#0079eb",
  },
  textoFiltro: {
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
  textoFiltroAtivo: {
    color: "white",
  },
  badge: {
    marginLeft: 8,
    backgroundColor: "red",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeTexto: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  botaoAdicionar: {
    position: "absolute",
    bottom: 16,
    right: 16,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#0079eb",
  },
});
