import { StyleSheet, Text, View } from "react-native";

export const renderProjeto = ({ item }) => (
  <View style={[styles.projetoContainer, styles.shadow]}>
    <View style={styles.projetoInfo}>
      <Text style={styles.projetoname}>{item.name}</Text>
      <Text style={styles.projetoduration}>{item.duration} dias</Text>
    </View>
    <View style={styles.statusContainer}>
      <Text style={[styles.statusText]}>{item.status}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  projetoContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginVertical: 10,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 3,
  },
  projetoInfo: {
    flex: 1,
  },
  projetoname: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  projetoduration: {
    fontSize: 14,
    color: '#555',
  },
  statusContainer: {
    backgroundColor: '#0079eb',
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  aguardando: {
    backgroundColor: '#ffbf00',
  },
  em_desenvolvimento: {
    backgroundColor: '#f56c6c',
  },
  desenvolvido: {
    backgroundColor: '#66bb6a',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
 