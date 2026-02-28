// response كامل من API
// address الواحد
export interface Address {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
}

export interface AddressResponse {
  results: number;
  status: string;
  data: Address[];
}
export interface AddressCardProps {
  address: Address;
  onDeleteSuccess: (newData: Address[]) => void; // غيرنا النوع هنا
}
export  interface AddAddressFormProps {
  onAddSuccess: (newData: any) => void; 
}

