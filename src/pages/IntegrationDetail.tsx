import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap } from 'lucide-react';

const IntegrationDetail = () => {
  const { integrationName } = useParams();

  // Simple function to format the slug back to a display name
  const formatDisplayName = (slug = '') => {
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="p-6 sm:p-8 bg-muted/40 min-h-full flex items-center justify-center">
      <Card className="w-full max-w-lg text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl">Administración de {formatDisplayName(integrationName)}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-lg">
            ¡Estamos construyendo algo increíble aquí!
          </p>
          <p className="text-muted-foreground mt-2">
            Próximamente podrás configurar todos los detalles de esta integración.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationDetail;
