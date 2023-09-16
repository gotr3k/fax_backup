#ifndef __STRING_H
#define __STRING_H 

#include "types.h"
	
	int32_t strlen(string str);

	bool strcmp(string str1, string str2);

	bool strmatch(string str1, string str2){
		int32_t len1, len2;
		len1 = strlen(str1);
		len2 = strlen(str2);

		if (len1 == len2)
		{
			for (int i = 0; i < strlen(str1); ++i)
			{
				if (str1[i] != str2[i])
				{
					return false;
				}
			}
			return true;
		}else{
			return false;
		}
	}


	int32_t strlen(string str){
		int32_t c = 0;
		for (int i = 0; str[i] != '\0'; ++i){
			c++;
		}
		return c;
	}
#endif