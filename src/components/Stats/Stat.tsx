import React from 'react';
import './styles/Stat.css';

type Props = {
  title: string;
  value: string | number;
}

const Stat = ({ title, value }: Props) => {
  return (
    <div className="Stat">
      <div className="Stat__Title">{title}</div>
      <div className="Stat__Value">{value}</div>
    </div>
  )
};

export default Stat;
