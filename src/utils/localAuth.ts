import * as LocalAuthentication from "expo-local-authentication";

/**
 * Authenticate the user
 */
export const authenticate = async () =>
  await LocalAuthentication.authenticateAsync();

/**
 * Check if Bio-Metric is present on the device
 */
export const hasBiometric = async () =>
  await LocalAuthentication.hasHardwareAsync();

/**
 * Check various types of authentication on device
 */
export const biometricTypes = async () =>
  await LocalAuthentication.supportedAuthenticationTypesAsync();
