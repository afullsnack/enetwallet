import { Container } from "@/components/Container";
import { useSession } from "@/contexts/session";
import { Redirect, useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function RootIndexPage() {
  const { session, isLoading } = useSession();
  const router = useRouter();

  console.log(session, isLoading, ":::Session and loading state");

  useEffect(() => {
    setTimeout(() => {
      if (!isLoading) {
        if (session === null) {
          console.log("Moving to /auth route");
          return router.replace("/(auth)/");
        } else {
          console.log(
            "if session exists move to dashboard",
            session,
            isLoading,
          );
          return router.replace("/(main)/(tabs)/");
        }
      }
    }, 4000);
  }, [isLoading, session]);

  // Loading Indicator for initial route
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
        }}
      >
        <ActivityIndicator size="large" color="#18EAFF" />
        <Text>Loading...</Text>
      </View>
    </Container>
  );
}
