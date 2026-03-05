/**
 * API Types
 * 
 * Common TypeScript types for API requests and responses
 */

/**
 * Standard API response structure
 */
export interface ApiResponse<T = any> {
    data: T;
    message?: string;
    success: boolean;
    error?: string;
  }
  
  /**
   * Paginated API response
   */
  export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    message?: string;
    success: boolean;
  }
  
  /**
   * API error response
   */
  export interface ApiError {
    message: string;
    error?: string;
    statusCode?: number;
    errors?: Record<string, string[]>;
  }
  
  /**
   * Request configuration options
   */
  export interface RequestConfig {
    headers?: Record<string, string>;
    params?: Record<string, string | number | boolean>;
    signal?: AbortSignal;
    skipAuth?: boolean; // Skip authentication headers (useful for login, public endpoints)
  }
  
  /**
   * HTTP Methods
   */
  export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  
  