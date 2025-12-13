/**
 * Extracts the subdomain from the current hostname
 * @param hostname - The hostname (defaults to window.location.hostname)
 * @returns The subdomain or null if no subdomain exists
 * 
 * Examples:
 * - "aniketkhillare.internvista.com" -> "aniketkhillare"
 * - "internvista.com" -> null
 * - "localhost" -> null
 * - "localhost:5173" -> null
 */
export const getSubdomain = (hostname: string = window.location.hostname): string | null => {
  // Handle localhost and IP addresses
  if (hostname === "localhost" || hostname === "127.0.0.1" || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return null;
  }

  const parts = hostname.split(".");
  
  // If we have at least 3 parts (subdomain.domain.tld), return the subdomain
  // For example: "aniketkhillare.internvista.com" -> ["aniketkhillare", "internvista", "com"]
  if (parts.length >= 3) {
    return parts[0];
  }

  return null;
};

/**
 * Gets the base domain (without subdomain)
 * @param hostname - The hostname (defaults to window.location.hostname)
 * @returns The base domain
 * 
 * Examples:
 * - "aniketkhillare.internvista.com" -> "internvista.com"
 * - "internvista.com" -> "internvista.com"
 */
export const getBaseDomain = (hostname: string = window.location.hostname): string => {
  // Handle localhost and IP addresses
  if (hostname === "localhost" || hostname === "127.0.0.1" || /^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
    return hostname;
  }

  const parts = hostname.split(".");
  
  // If we have at least 3 parts, return everything except the first part
  if (parts.length >= 3) {
    return parts.slice(1).join(".");
  }

  // Otherwise return the hostname as-is
  return hostname;
};

/**
 * Builds a subdomain URL
 * @param subdomain - The subdomain (username)
 * @param path - The path (e.g., "/aniket")
 * @param protocol - The protocol (defaults to window.location.protocol)
 * @param baseDomain - The base domain (defaults to getBaseDomain())
 * @returns The full subdomain URL
 * 
 * Example:
 * buildSubdomainUrl("aniketkhillare", "/aniket") -> "https://aniketkhillare.internvista.com/aniket"
 */
export const buildSubdomainUrl = (
  subdomain: string,
  path: string = "",
  protocol: string = window.location.protocol,
  baseDomain: string = getBaseDomain()
): string => {
  // Remove leading slash from path if present (we'll add it back)
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${protocol}//${subdomain}.${baseDomain}${cleanPath}`;
};
