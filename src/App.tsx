import { useState, type FC, type SubmitEventHandler } from 'react';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from './components/ui/field';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
import { AlertCircleIcon } from 'lucide-react';
import { Spinner } from './components/ui/spinner';
import { sendCSVData } from './features/google-ai-studio-api';

const App: FC = () => {
  const csvFileInputName = 'csv-file-input';
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

      const aiResponse = await sendCSVData(csvText);

      console.log('ответ от ии агента', aiResponse);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 items-center p-4">
      <form
        className="flex flex-col gap-4 w-full"
        action=""
        onSubmit={handleSubmit}
      >
        <FieldGroup className="xl:max-w-4xl md:max-w-xl sm:max-w-lg max-w-sm mx-auto">
          <Field>
            <FieldLabel htmlFor={csvFileInputName}>Загрузка файла</FieldLabel>

            <Input
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
    </div>
  );
};

export default App;
