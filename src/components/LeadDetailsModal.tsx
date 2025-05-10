
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Briefcase, Building, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeadDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  lead: {
    id: number;
    company: string;
    location: string;
    industry: string;
    contact: string;
    position: string;
    match: number;
    email?: string;
    phone?: string;
    lastProject?: string;
    foundedYear?: number;
    employeeCount?: string;
    recentPurchases?: string[];
    notes?: string;
  } | null;
}

const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({ isOpen, onClose, lead }) => {
  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">{lead.company}</span>
            <Badge variant="outline" className={`ml-2 ${lead.match > 90 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
              {lead.match}% Match
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Detalhes completos do lead qualificado
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Building className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Empresa</p>
                <p className="text-stone-600">{lead.company}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Localização</p>
                <p className="text-stone-600">{lead.location}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Briefcase className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Setor</p>
                <p className="text-stone-600">{lead.industry}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <User className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium">Contato</p>
                <p className="text-stone-600">{lead.contact}, {lead.position}</p>
              </div>
            </div>

            {lead.email && (
              <div className="flex items-start gap-2">
                <Mail className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-stone-600">{lead.email}</p>
                </div>
              </div>
            )}

            {lead.phone && (
              <div className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Telefone</p>
                  <p className="text-stone-600">{lead.phone}</p>
                </div>
              </div>
            )}

            {lead.foundedYear && (
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">Fundação</p>
                  <p className="text-stone-600">{lead.foundedYear}</p>
                </div>
              </div>
            )}
          </div>

          {lead.lastProject && (
            <div className="pt-2">
              <p className="font-medium mb-1">Último Projeto</p>
              <p className="text-stone-600 bg-stone-50 p-3 rounded-md border border-stone-200">{lead.lastProject}</p>
            </div>
          )}

          {lead.recentPurchases && lead.recentPurchases.length > 0 && (
            <div className="pt-2">
              <p className="font-medium mb-1">Compras Recentes</p>
              <ul className="list-disc pl-5 text-stone-600">
                {lead.recentPurchases.map((purchase, index) => (
                  <li key={index}>{purchase}</li>
                ))}
              </ul>
            </div>
          )}

          {lead.notes && (
            <div className="pt-2">
              <p className="font-medium mb-1">Observações</p>
              <p className="text-stone-600 bg-stone-50 p-3 rounded-md border border-stone-200">{lead.notes}</p>
            </div>
          )}
        </div>

        <DialogFooter className="flex sm:justify-between flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onClose}>Fechar</Button>
          <div className="flex gap-2">
            <Button variant="outline" className="border-amber-500 text-amber-600 hover:text-amber-700 hover:bg-amber-50">
              Exportar dados
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-stone-900">
              Contatar lead
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeadDetailsModal;
