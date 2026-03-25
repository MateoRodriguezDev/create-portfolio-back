type ResponsePayload = {
    success: boolean;
    message: string;
    result: any;
    errors: any[];
    token: string | null;
  };
  
  export function createResponse(
    success: boolean,
    message: string,
    data?: any,
    error: any[] = [],
    token: string | null = null
  ): ResponsePayload {
    return {
      success,
      message,
      result: data ?? [],
      errors: error,
      token,
    };
  }
  