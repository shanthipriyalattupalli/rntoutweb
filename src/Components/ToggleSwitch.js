

const ToggleSwitch = ({ isToggled, onToggle }) => (
  <div className="toggle-container" onClick={onToggle}>
    <div className={`toggle-switch ${isToggled ? "toggled" : ""}`}>
      <div className="toggle-knob"></div>
    </div>
    <label className="toggle-label">
      {isToggled ? "Cancelled Orders" : "All Active Orders"}
    </label>
  </div>
);
