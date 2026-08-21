import { MenuItem, BusinessInfo } from './data/bakebriefData';

export type { MenuItem, BusinessInfo };

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedItems?: MenuItem[];
  parsedOrder?: ParsedOrderDraft;
  quickReplies?: string[];
  isError?: boolean;
}

export interface ParsedOrderDraft {
  customerName?: string;
  phone?: string;
  items?: {
    name: string;
    quantity: number;
    notes?: string;
  }[];
  orderType?: 'pickup' | 'delivery';
  preferredTime?: string;
  deliveryAddress?: string;
  status: 'draft' | 'ready_for_review' | 'confirmed_by_store';
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  selectedOption?: { name: string; price: number };
  specialInstructions?: string;
}

export interface OrderSubmission {
  id: string;
  customerName: string;
  phoneNumber: string;
  orderType: 'pickup' | 'delivery';
  deliveryAddress?: string;
  preferredTime: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  notes?: string;
  createdAt: string;
  status: 'Received by Assistant' | 'Pending Store Confirmation' | 'Confirmed';
}
