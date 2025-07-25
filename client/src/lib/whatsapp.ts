/**
 * Generates a WhatsApp message for product orders
 * @param productName - Name of the product being ordered
 * @returns Formatted message string
 */
export function generateWhatsAppMessage(productName: string): string {
  return `Olá, Ateliê Márcia Waltrick! Tenho interesse no modelo '${productName}' e gostaria de mais informações sobre a confecção sob medida.`;
}

/**
 * Opens WhatsApp with a pre-filled message
 * @param message - The message to send
 * @param phoneNumber - Optional phone number (defaults to ateliê's number)
 */
export function openWhatsApp(message: string, phoneNumber: string = "5549991981559"): void {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
}

/**
 * Generates a WhatsApp message for general inquiries
 * @param customerName - Optional customer name
 * @param inquiry - The type of inquiry
 * @returns Formatted message string
 */
export function generateInquiryMessage(inquiry: string, customerName?: string): string {
  const greeting = customerName 
    ? `Olá, Ateliê Márcia Waltrick! Meu nome é ${customerName}.` 
    : `Olá, Ateliê Márcia Waltrick!`;
  
  return `${greeting} ${inquiry}`;
}

/**
 * Generates a WhatsApp message for custom measurements
 * @param productName - Name of the product
 * @param customerName - Customer's name
 * @returns Formatted message string
 */
export function generateMeasurementMessage(productName: string, customerName?: string): string {
  const greeting = customerName 
    ? `Olá, Ateliê Márcia Waltrick! Meu nome é ${customerName}.` 
    : `Olá, Ateliê Márcia Waltrick!`;
  
  return `${greeting} Gostaria de agendar um horário para tirar medidas para o modelo '${productName}'. Como podemos proceder?`;
}

/**
 * Generates a WhatsApp message for price inquiry
 * @param productName - Name of the product
 * @returns Formatted message string
 */
export function generatePriceInquiryMessage(productName: string): string {
  return `Olá, Ateliê Márcia Waltrick! Gostaria de saber o valor do modelo '${productName}' confeccionado sob medida. Aguardo retorno!`;
}

/**
 * Validates Brazilian phone number format
 * @param phone - Phone number to validate
 * @returns Boolean indicating if phone is valid
 */
export function isValidBrazilianPhone(phone: string): boolean {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Brazilian mobile number (11 digits with country code)
  // Format: 55 + DD + 9XXXX-XXXX (where DD is area code)
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    return true;
  }
  
  // Check if it's a valid Brazilian mobile number without country code (11 digits)
  // Format: DD + 9XXXX-XXXX
  if (cleaned.length === 11 && cleaned.charAt(2) === '9') {
    return true;
  }
  
  return false;
}

/**
 * Formats a Brazilian phone number for WhatsApp
 * @param phone - Raw phone number
 * @returns Formatted phone number with country code
 */
export function formatPhoneForWhatsApp(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  
  // If already has country code
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    return cleaned;
  }
  
  // If it's 11 digits (with area code and 9)
  if (cleaned.length === 11) {
    return `55${cleaned}`;
  }
  
  // If it's 10 digits (add the 9 and country code)
  if (cleaned.length === 10) {
    return `55${cleaned.substring(0, 2)}9${cleaned.substring(2)}`;
  }
  
  // Return as is if format is unclear
  return cleaned;
}
