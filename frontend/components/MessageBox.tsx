interface Props {
    message: string;
  }
  
  export default function MessageBox({ message }: Props) {
    return <p style={{ marginTop: "10px" }}>{message}</p>;
  }
  