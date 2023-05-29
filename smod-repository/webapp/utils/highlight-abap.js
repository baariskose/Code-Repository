
hljs.registerLanguage(
    "abap",
    (() => {
      "use strict";
      return (E) => ({
        case_insensitive: !0,
        aliases: ["sap-abap", "abap"],
        keywords: {
          keyword:
            "ABBREVIATED ABS ABSTRACT ABSTRACTFINAL ACCEPT ACCEPTING ACCORDING ACOS ACTUAL ADD|0 ADD-CORRESPONDING ADDITIONS ADJACENT AFTER|0 ALIASES ALL|0 ALLOCATE ANALYZER AND|0 APPEND APPENDING AS|0 ASCENDING DESCENDING ASIN ASSIGN ASSIGNING ATAN ATTRIBUTE AUTHORITY-CHECK AVG|0 BACK|0 BACKGOUND BEFORE BETWEEN BINARY BIT BLANK|0 BLOCK BREAK-POINT BUFFER BY|0 BYPASSING BYTE|0 BYTECHARACTER CALL|0 CASTING CEIL|0 CENTERED CHANGE CHANGING CHARACTER CHECK CHECKBOX CLASS-DATA CLASS-EVENTS CLASS-METHODS CLEANUP CLEAR|0 CLASS ENDCLASS CLIENT CLOCK|0 CLOSE|0 COL_BACKGROUND COL_HEADING COL_NORMAL COL_TOTAL COLLECT|0 COLOR|0 COLUMN COMMENT COMMIT COMMON COMMUNICATION COMPARING COMPONENT COMPONENTS COMPUTE CONCATENATE CONDENSE CONSTANTS CONTEXT CONTEXTS CONTINUE|0 CONTROL CONTROLS CONVERSION CONVERT COS COSH COUNT|0 COUNTRY COUNTY CREATE CURRENCY CURRENT CURSOR CUSTOMER-FUNCTION DATA DATABASE DATASET DATE DEALLOCATE DECIMALS DEFAULT DEFERRED DEFINE DEFINING DEFINITION DELETE DELETING DEMAND DESCENDING DESCRIBE DESTINATION DIALOG DIRECTORY DISTANCE DISTINCT DIVIDE DIVIDE-CORRESPONDING DUPLICATE DUPLICATES DURING DYNAMIC EDIT EDITOR-CALL ELSE ELSEIF ENCODING ENDING ENDON ENTRIES ERRORS EVENT EVENTS EXCEPTION EXCEPTIONS EXCEPTION-TABLE EXCLUDE EXCLUDING EXIT EXIT-COMMAND EXPORT EXPORTING EXTENDED EXTENSION EXTRACT FETCH FIELD FIELD-GROUPS FIELDSNO FIELD-SYMBOLS FILTER FINAL FIND|0 FIRST FLOOR FOR|0 FORMAT FORWARDBACKWARD FOUND FRAC FRAME FREE|0 FRIENDS FROM FUNCTION-POOL GET|0 GIVING GROUP HANDLER HASHED HAVING HEADER HEADING HELP-ID HIDE|0 HIGHLOW HOLD|0 HOTSPOT ICON IGNORING IMMEDIATELY IMPLEMENTATION IMPORT IMPORTING IN INCLUDE|0 INCREMENT INDEX|0 INDEX-LINE INHERITING INIT INITIAL INITIALIZATION INNER INNERLEFT INSERT INSTANCES INTENSIFIED INTERFACES INTERVALS INTO INVERTED-DATE IS|0 ITAB JOIN KEEPING KEY|0 KEYS KIND LANGUAGE LAST|0 LEADING LEAVE LEFT LEFT-JUSTIFIED LEFTRIGHT LEFTRIGHTCIRCULAR LEGACY LENGTH LIKE LINE LINE-COUNT LINES LINE-SELECTION LINE-SIZE LIST LIST-PROCESSING LOAD LOAD-OF-PROGRAM LOCAL LOCALE LOG LOG10 LOWER MARGIN MARK MASK MATCH MAX MAXIMUM MEMORY|0 MESSAGE MESSAGE-ID MESSAGES METHODS MIN MOD MODE MODEIN MODIF MODIFIER MODIFY MOVE MOVE-CORRESPONDING MULTIPLY MULTIPLY-CORRESPONDING NEW|0 NEW-LINE NEW-PAGE NEXT|0 NODES NODETABLE NO-DISPLAY NO-GAP NO-GAPS NO-HEADINGWITH-HEADING NO-SCROLLING NO-SCROLLINGSCROLLING NOT|0 NO-TITLE WITH-TITLE NO-ZERO NP NS NUMBER OBJECT|0 OBLIGATORY OCCURENCE OCCURENCES OCCURS OF|0 OFF|0 OFFSET ON|0 ONLY|0 OPEN OPTION OPTIONAL OR|0 ORDER OTHERS|0 OUTER OUTPUT-LENGTH OVERLAY PACK PACKAGE PAGE PAGELAST PAGEOF PAGEPAGE PAGES PARAMETER PARAMETERS PARAMETER-TABLE PART PERFORM PERFORMING PFN PF-STATUS PLACES POS_HIGH POS_LOW POSITION POSITIONS PRIMARY PRINT PRINT-CONTROL PRIVATE PROCESS PROGRAM PROPERTY PROTECTED PUBLIC PUSHBUTTON PUT QUICKINFO RADIOBUTTON RAISE|0 RAISING RANGE RANGES READ RECEIVE RECEIVING REDEFINITION REF REFERENCE REFRESH REJECT RENAMING REPLACE REPLACEMENT REPORT RESERVE RESET RESOLUTION RESULTS RETURN|0 RETURNING RIGHT RIGHT-JUSTIFIED ROLLBACK ROWS RUN SCAN SCREEN SCREEN-GROUP1 SCREEN-GROUP2 SCREEN-GROUP3 SCREEN-GROUP4 SCREEN-GROUP5 SCREEN-INPUT SCREEN-INTENSIFIED SCROLL SCROLL-BOUNDARY SEARCH SECTION SELECT SELECTION SELECTIONS SELECTION-SCREEN SELECTION-SET SELECTION-TABLE SELECT-OPTIONS SEND|0 SEPARATED SET|0 SHARED SHIFT SIGN SIN SINGLE SINGLEDISTINCT SINH SIZE|0 SKIP SORT|0 SORTABLE SPECIFIED SPLIT SQL|0 SQRT STABLE STAMP STANDARD|0 START|0 STARTING STATICS STEP-LOOP STOP STRLEN STRUCTURE|0 SUBMIT SUBTRACT SUBTRACT-CORRESPONDING SUFFIX SUM SUPPLY SUPPRESS SYMBOLS SYSTEM-EXCEPTIONS TABLE|0 TABLENAME TABLES TABLEVIEW TAN TANH TASK TEXT THEN|0 TIME|0 TIMES TITLE TITLEBAR TO TOPIC TOP-OF-PAGE TRAILING TRANSACTION TRANSFER TRANSLATE TRUNC TYPE TYPELIKE TYPE-POOL TYPE-POOLS TYPES ULINE UNION UNIQUE UNIT UNTIL|0 UP|0 UPDATE|0 UPPER UPPERLOWER USER-COMMAND USING VALUE|0 VALUES VARY VARYING VERSION VIA WAIT WHEN WHERE WINDOW WITH|0 WORK|0 WRITE|0 XSTRLEN ZONECA CN CO CP CS EQ GE GT LE LT NA NESTART-OF-SELECTION START-OF-PAGE END-OF-PAGE END-OF-SELECTION AT ENDAT",
          literal: "abap_true abap_false",
          built_in:
            "DO FORM IF LOOP MODULE START-OF_FILE DEFINE WHILE BEGIN ENDDO ENDFORM|10 ENDIF ENDLOOP ENDMODULE END-OF_FILE END-OF-DEFINITION ENDWHILE END METHOD ENDMETHOD|10 CHAIN ENDCHAIN CASE ENDCASE FUNCTION ENDFUNCTION ELSEIF ELSE TRY ENDTRY|10 CATCH ",
        },
        contains: [
          E.APOS_STRING_MODE,
          E.NUMBER_MODE,
          { className: "comment", begin: "^[*]", relevance: 0, end: "\n" },
          { className: "comment", begin: '\b*"', relevance: 0, end: "\n" },
        ],
      });
    })()
  );