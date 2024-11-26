import * as React from "react";
import { AntDesign } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import CriarTarefasScreen from "./ui/screens/Tarefas/CriarTarefasScreen";
import ProjetosScreen from "./ui/screens/Projetos/ProjetosScreen";
import ProjetoDetalhesScreen from "./ui/screens/Projetos/ProjetoDetalhesScreen";
import CriarProjetoScreen from "./ui/screens/Projetos/CriarProjetosScreen";
import EditarTarefasScreen from "./ui/screens/Tarefas/EditarTarefasScreen";
import { Colors } from "./ui/colors/colors";
import DashboardScreen from "./ui/screens/Dashboard/DashboardScreen";

// Criando os navegadores
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Navegação de Projetos
function ProjetosStack() {
  return (
    <Stack.Navigator initialRouteName="Projetos">
      {/* Tela inicial com o menu hambúrguer */}
      <Stack.Screen
        name="Projetos"
        component={ProjetosScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <AntDesign
              name="menu-fold"
              size={24}
              color="white"
              onPress={() => navigation.toggleDrawer()}
              style={{ marginLeft: 16 }}
            />
          ),
          title: "Projetos",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "#fff",
        })}
      />
      {/* Telas sem o menu hambúrguer */}
      <Stack.Screen
        name="Criar Tarefas"
        component={CriarTarefasScreen}
        options={{
          title: "Criar Tarefas",
          headerBackTitle: "Voltar",
          headerStyle: {
            backgroundColor: "#0079eb",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Criar Projetos"
        component={CriarProjetoScreen}
        options={{
          title: "Criar Projetos",
          headerBackTitle: "Voltar",
          headerStyle: {
            backgroundColor: "#0079eb",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Detalhes do Projeto"
        component={ProjetoDetalhesScreen}
        options={{
          title: "Detalhes do Projeto",
          headerBackTitle: "Voltar",
          headerStyle: {
            backgroundColor: "#0079eb",
          },
          headerTintColor: "#fff",
        }}
      />
      <Stack.Screen
        name="Editar Tarefa"
        component={EditarTarefasScreen}
        options={{
          title: "Editar Tarefa",
          headerBackTitle: "Voltar",
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: "#fff",
        }}
      />
    </Stack.Navigator>
  );
}

// Drawer Navigator
export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#f5f5f5",
            width: 240,
          },
          headerShown: false, // Esconde o cabeçalho padrão do Drawer
        }}
      >
        {/* Navegação do menu hambúrguer */}
        <Drawer.Screen
          name="Projetos"
          component={ProjetosStack}
          options={{
            drawerIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            drawerIcon: ({ color, size }) => (
              <AntDesign name="dashboard" size={size} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
