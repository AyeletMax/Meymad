class ApiService {
  static async request({ endPath, method = "GET", body = null, headers = {}, credentials = null }) {
    try {
      const defaultHeaders = {
        "Content-Type": "application/json",
        ...headers,
      };
      
      const options = {
        method,
        headers: defaultHeaders,
      };


      if (credentials !== null) {
        options.credentials = credentials;
      }

      if (body) {
        options.body = JSON.stringify(body);
      }
      
      const baseUrl =  'http://localhost:3000/';
      const response = await fetch(`${baseUrl}${endPath}`, options);
      
      const contentType = response.headers.get('content-type');
      let data;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        data = { message: text };
      }
      
      if (!response.ok) {
        throw {
          status: response.status,
          data,
          message: data.error || data.message || `Error: ${response.status} ${response.statusText}`,
        };
      }
      
      return data;
    } catch (error) {
      console.error('ApiService Error:', error);
      if (error.status !== undefined) {
        throw error;
      }
      
      throw {
        status: null,
        data: null,
        message: error.message || "שגיאה לא ידועה ב-ApiService",
      };
    }
  }

 
}

export default ApiService;