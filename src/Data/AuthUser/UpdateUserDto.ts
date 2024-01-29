export interface UpdateAuthUserDto {
  user_id: string;
  first_name?: string;
  last_name?: string;
  dealership_name?: string;
  active?: boolean;
  type?: string;
}

export interface UpdateAuthUserDbDto {
  first_name?: string;
  last_name?: string;
  active?: boolean;
  type?: string;
}
