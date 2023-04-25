import { Component } from "react";

class CellRolUsuario extends Component {
  colorsCells = {
    Admin: "bg-secondary",
    Cliente: "bg-primary-500",
  };

  setColorEstadoVenta(row) {
    return this.colorsCells[row.role];
  }

  render() {
    return (
      <button
        className={`h-full w-full group relative 
        ${this.setColorEstadoVenta(this.props.data)}`}
        id="btnAction"
      >
        <div
          className={`flex justify-center rounded 
          ${this.setColorEstadoVenta(
            this.props.data
          )} py-1 px-4 capitalize text-xs font-bold `}
        >
          <p className="text-white  text-sm">{this.props.data.role}</p>
        </div>
      </button>
    );
  }
}

export default CellRolUsuario;
