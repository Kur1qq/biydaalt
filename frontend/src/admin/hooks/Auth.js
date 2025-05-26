export function Auth() {
    const token = localStorage.getItem("adminToken");
    return !!token; 
  }
  