import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import {
  isAiAgentApiError,
  sendCSVData,
  type AiAgentApiError,
  type FinancialAnalysis,
} from '@/features/google-ai-studio-api';
import { AlertCircleIcon } from 'lucide-react';
import {
  useState,
  type Dispatch,
  type FC,
  type SetStateAction,
  type SubmitEventHandler,
} from 'react';

interface FinancesCSVDataFileInputProps {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setAiAgentResponse: Dispatch<SetStateAction<FinancialAnalysis | null>>;
}

export const FinancesCSVDataFileInput: FC<FinancesCSVDataFileInputProps> = ({
  isLoading,
  setIsLoading,
  setAiAgentResponse,
}) => {
  const csvFileInputName = 'csv-file-input';
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit: SubmitEventHandler<HTMLFormElement> = async (event) => {
    setIsLoading(true);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    try {
      const file = formData.get(csvFileInputName) as File;
      const fileExtension = file.type;

      if (!fileExtension.toLocaleLowerCase().includes('csv')) {
        setErrorMessage('Ожидаемый тип файла: .csv!');
        return;
      }
      setErrorMessage('');

      const csvText = await file.text();

      const aiResponse: FinancialAnalysis | string | AiAgentApiError =
        await sendCSVData(csvText);

      if (typeof aiResponse === 'string') {
        setErrorMessage(aiResponse);
        return;
      }

      if (isAiAgentApiError(aiResponse)) {
        setErrorMessage(
          `${aiResponse.error.code}: ${aiResponse.error.message}`,
        );
        return;
      }
      setErrorMessage('');

      setAiAgentResponse(aiResponse);
    } catch (err) {
      alert(
        'возникла ошибка, откройте консоль для подробной информации (FN + F12)',
      );
      /* eslint-disable no-console */
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-4 w-full"
      action=""
      onSubmit={handleSubmit}
    >
      <FieldGroup className="xl:max-w-4xl md:max-w-xl sm:max-w-lg max-w-sm mx-auto">
        <Field>
          <FieldLabel htmlFor={csvFileInputName}>Загрузка файла</FieldLabel>

          <Input
            disabled={isLoading}
            accept=".csv"
            name={csvFileInputName}
            id={csvFileInputName}
            type="file"
          />

          <FieldDescription>
            Выберите CSV файл с данными о ваших тратах
          </FieldDescription>
        </Field>

        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <Spinner />}Подтвердить
          </Button>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Ошибка</AlertTitle>

              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}
        </Field>
      </FieldGroup>
    </form>
  );
};
