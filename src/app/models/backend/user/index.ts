export interface User{
  email: string;
  username: string;
  token: Token;
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface Token{
  refresh: string;
  access: string
}
