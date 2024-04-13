import { Container } from "@/components/Container";
import { useSession } from "@/contexts/session";
import { Redirect, router } from "expo-router";
import { ActivityIndicator, Button, Text, View } from "react-native";

export default function RootIndexPage() {
  const { session, isLoading } = useSession();

  console.log(session, isLoading, ":::Session and loading state");

  // Loading Indicator for initial route
  if (isLoading && !session) {
    return (
      <Container>
        <View
          style={{
            width: "100%",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#0C0C12",
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" color="#18EAFF" />
          <Text>Loading...</Text>
        </View>
      </Container>
    );
  }

  // Redirect to auth if no session
  if (!session && !isLoading) {
    return <Redirect href="/(auth)/" />;
  }

  return <Redirect href="/(main)/(tabs)/" />;
}
