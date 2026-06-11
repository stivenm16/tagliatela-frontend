/**
 * Feature Flags — Tagliatela Frontend
 *
 * Cambia a `true` para habilitar una funcionalidad.
 * Una vez el cliente confirme, se puede eliminar el flag y el código envuelto.
 */
const featureFlags = {
  /**
   * Muestra los controles +/- de cantidad en los platos seleccionados
   * de la sección CheckMeeting.
   * DB: recommended_quantity column ya existe, solo ocultamos la UI.
   */
  checkMeetingQuantity: false,

  /**
   * Muestra el plato "Pizza Gustosa di Prosciutto Cotto" (id 67).
   * DB: Actualmente está soft-delete (deletedat seteado).
   * Para habilitar: ejecutar en DB:
   *   UPDATE dish SET deletedat = NULL WHERE id = 67;
   * Luego cambiar este flag a true.
   */
  pizzaGustosaProsciuttoCotto: false,
}

export default featureFlags
