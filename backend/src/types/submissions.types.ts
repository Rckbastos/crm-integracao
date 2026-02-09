export type SubmissionStatus =
  | "Pendente"
  | "Aguardando"
  | "Integrando"
  | "Concluido"
  | "Rejeitado";
type Optional<T> = T | undefined;

export interface SubmissionInput {
  gatewayName: string;
  gatewayLogoName?: string | null;
  whitelabelName: string;
  responsibleName: string;
  responsibleEmail: string;
  responsiblePhone: string;
  developerName: string;
  developerEmail: string;
  developerPhone: string;
  apiDocUrl?: string | null;
  apiDocFileName?: string | null;
  paymentMethods: string[];
  sandboxKeys: string;
  productionAccount?: string | null;
}

export interface SubmissionUpdateInput {
  gatewayName?: Optional<string>;
  gatewayLogoName?: Optional<string | null>;
  whitelabelName?: Optional<string>;
  responsibleName?: Optional<string>;
  responsibleEmail?: Optional<string>;
  responsiblePhone?: Optional<string>;
  developerName?: Optional<string>;
  developerEmail?: Optional<string>;
  developerPhone?: Optional<string>;
  apiDocUrl?: Optional<string | null>;
  apiDocFileName?: Optional<string | null>;
  paymentMethods?: Optional<string[]>;
  sandboxKeys?: Optional<string>;
  productionAccount?: Optional<string | null>;
  status?: Optional<SubmissionStatus>;
  approvedAt?: Optional<string | null>;
  integrandoAt?: Optional<string | null>;
  concluidoAt?: Optional<string | null>;
}
