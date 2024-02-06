import { ServiceRequest } from '../../../interfaces';

class ServiceMap {
  formatPrice = (price: string) => {
    const valorNumerico = price.replace(/[^\d,]/g, '');
    const valorNumericoPonto = valorNumerico.replace(',', '.');
    const numero = parseFloat(valorNumericoPonto);
    if (!isNaN(numero)) {
      return numero;
    } else {
      return null;
    }
  };

  toPersistent(service: ServiceRequest) {
    const serviceModified = { ...service };
    serviceModified.price = this.formatPrice(service.price as string);
    return serviceModified;
  }
}

export default new ServiceMap();
