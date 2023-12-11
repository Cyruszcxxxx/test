import React, { useState } from 'react'; 
import { useTranslation } from 'react-i18next';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

type Props = {
    onSearch: (query: string) => void
}

const TransactionSearch = (props: Props): React.ReactElement => {
    const [value, setValue] = useState('');
    const { t } = useTranslation('common');
    
    const search = () => {
      props.onSearch(value);
    };
  
    return (
      <Container sx={{ mb: 2 }}>
        <TextField 
          variant="outlined" 
          size="small" 
          sx={{ mr: 1 }} 
          onChange={(e) => setValue(e.target.value)}
        />
        <Button 
          variant="contained" 
          onClick={search}
        >
          {t('Search By Comment')}
        </Button>
      </Container>
    );
  };
  
  export default TransactionSearch;