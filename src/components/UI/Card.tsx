import React, {ReactNode} from "react";
import './Card.css';
type Props = {
    
    children?: ReactNode
  }

const Card: React.FC<Props> = ({ children}) => {
    return (
        <section
          className="card"
        >
          {children}
        </section>
      );
};

export default Card;