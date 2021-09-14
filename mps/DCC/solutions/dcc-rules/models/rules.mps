<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:ebea898f-fddf-455a-9113-e176ef8a2a48(rules)">
  <persistence version="9" />
  <languages>
    <use id="e82eb0de-3adc-4193-b887-7c66aff9edce" name="ValidationRules" version="0" />
  </languages>
  <imports />
  <registry>
    <language id="e82eb0de-3adc-4193-b887-7c66aff9edce" name="ValidationRules">
      <concept id="7754580153243539112" name="ValidationRules.structure.ValidationRules" flags="ng" index="NZtGS">
        <property id="4571589353566812369" name="showAssertions" index="29fNiq" />
        <property id="7754580153243539113" name="memberState" index="NZtGT" />
        <child id="7754580153243539180" name="rules" index="NZtHW" />
      </concept>
      <concept id="7754580153243539114" name="ValidationRules.structure.ValidationRule" flags="ng" index="NZtGU">
        <property id="7754580153243539209" name="businessDescription" index="NZtEp" />
        <property id="7754580153243539210" name="description" index="NZtEq" />
        <property id="7754580153243539211" name="inputParameterDescription" index="NZtEr" />
        <property id="7754580153243539181" name="type" index="NZtHX" />
        <property id="7754580153243539182" name="sequenceNumber" index="NZtHY" />
        <child id="5791880006356428001" name="certLogicExpression" index="28VK3c" />
      </concept>
    </language>
    <language id="ceab5195-25ea-4f22-9b92-103b95ca8c0c" name="jetbrains.mps.lang.core">
      <concept id="1133920641626" name="jetbrains.mps.lang.core.structure.BaseConcept" flags="ng" index="2VYdi">
        <child id="5169995583184591170" name="smodelAttribute" index="lGtFl" />
      </concept>
      <concept id="1169194658468" name="jetbrains.mps.lang.core.structure.INamedConcept" flags="ng" index="TrEIO">
        <property id="1169194664001" name="name" index="TrG5h" />
      </concept>
      <concept id="709746936026466394" name="jetbrains.mps.lang.core.structure.ChildAttribute" flags="ng" index="3VBwX9">
        <property id="709746936026609031" name="linkId" index="3V$3ak" />
        <property id="709746936026609029" name="role_DebugInfo" index="3V$3am" />
      </concept>
      <concept id="4452961908202556907" name="jetbrains.mps.lang.core.structure.BaseCommentAttribute" flags="ng" index="1X3_iC">
        <child id="3078666699043039389" name="commentedNode" index="8Wnug" />
      </concept>
    </language>
    <language id="f438ba37-ebb1-4d1d-8597-c788686499ba" name="CertLogic">
      <concept id="5791880006357800925" name="CertLogic.structure.VariadicInfixOperation" flags="ng" index="28L3fK">
        <property id="5791880006357800926" name="operator" index="28L3fN" />
        <child id="5791880006357800928" name="operands" index="28L3fd" />
      </concept>
      <concept id="5791880006357852762" name="CertLogic.structure.PlusTime" flags="ng" index="28LkpR">
        <property id="5791880006357852765" name="amount" index="28LkpK" />
        <property id="5869320185948015381" name="unit" index="3_0wy9" />
        <child id="5791880006357852767" name="operand" index="28LkpM" />
      </concept>
      <concept id="5791880006356543279" name="CertLogic.structure.IfThenElse" flags="ng" index="28Wkc2">
        <child id="5791880006356543284" name="then" index="28Wkcp" />
        <child id="5791880006356543287" name="else" index="28Wkcq" />
        <child id="5791880006356543282" name="guard" index="28Wkcv" />
      </concept>
      <concept id="5791880006356517727" name="CertLogic.structure.Reduce" flags="ng" index="28WqtM">
        <child id="5791880006356517732" name="lambda" index="28Wqt9" />
        <child id="5791880006356517735" name="initial" index="28Wqta" />
        <child id="5791880006356517730" name="operand" index="28Wqtf" />
      </concept>
      <concept id="5791880006356567740" name="CertLogic.structure.Array" flags="ng" index="28WIah">
        <child id="5791880006356567743" name="members" index="28WIai" />
      </concept>
      <concept id="5791880006356691158" name="CertLogic.structure.Boolean" flags="ng" index="28WKNV">
        <property id="5791880006356691163" name="value" index="28WKNQ" />
      </concept>
      <concept id="5791880006356799319" name="CertLogic.structure.Not" flags="ng" index="28XmHU">
        <child id="5791880006356799322" name="operand" index="28XmHR" />
      </concept>
      <concept id="7754580153242776118" name="CertLogic.structure.String" flags="ng" index="NMrYA">
        <property id="7754580153242776121" name="value" index="NMrYD" />
      </concept>
      <concept id="7754580153242695190" name="CertLogic.structure.DataAccess" flags="ng" index="NNJI6">
        <property id="7754580153242695191" name="path" index="NNJI7" />
      </concept>
      <concept id="7754580153242339962" name="CertLogic.structure.Integer" flags="ng" index="NO0vE">
        <property id="7754580153242339964" name="value" index="NO0vG" />
      </concept>
      <concept id="7754580153242338468" name="CertLogic.structure.BinaryOperation" flags="ng" index="NO0$O">
        <property id="7754580153242685922" name="operator" index="NNHLM" />
        <child id="7754580153242338469" name="leftOperand" index="NO0$P" />
        <child id="7754580153242338470" name="rightOperand" index="NO0$Q" />
      </concept>
    </language>
  </registry>
  <node concept="NZtGS" id="6ItNp1oob0E">
    <property role="TrG5h" value="EU template rules" />
    <property role="NZtGT" value="6ItNp1oo1q$/EU" />
    <property role="29fNiq" value="true" />
    <node concept="NZtGU" id="6ItNp1oob0F" role="NZtHW">
      <property role="NZtHY" value="0001" />
      <property role="NZtHX" value="6ItNp1oo1qH/GR" />
      <property role="NZtEq" value="The &quot;disease or  agent targeted&quot; must be COVID-19 of the value set list." />
      <property role="NZtEr" value="Entire HCert JSON (&quot;v&quot;,&quot;t&quot;,&quot;r&quot;,&quot;..&quot;) + Valuesets + &quot;tg&quot;" />
      <node concept="28L3fK" id="51wT2RoDvAX" role="28VK3c">
        <property role="28L3fN" value="6ItNp1okL7m/and" />
        <node concept="28Wkc2" id="51wT2Ro$Sbs" role="28L3fd">
          <node concept="NNJI6" id="51wT2Ro$Sby" role="28Wkcv">
            <property role="NNJI7" value="payload.r.0" />
          </node>
          <node concept="28WKNV" id="51wT2Ro_5dW" role="28Wkcq">
            <property role="28WKNQ" value="true" />
          </node>
          <node concept="NO0$O" id="51wT2RoBCQw" role="28Wkcp">
            <property role="NNHLM" value="6ItNp1ooGDC/in" />
            <node concept="NNJI6" id="51wT2RoBCQ$" role="NO0$P">
              <property role="NNJI7" value="payload.r.0.tg" />
            </node>
            <node concept="NNJI6" id="51wT2RoBCQA" role="NO0$Q">
              <property role="NNJI7" value="external.valueSets.disease-agent-targeted" />
            </node>
          </node>
        </node>
        <node concept="28Wkc2" id="51wT2Ro_Cxa" role="28L3fd">
          <node concept="NNJI6" id="51wT2Ro_Cxe" role="28Wkcv">
            <property role="NNJI7" value="payload.t.0" />
          </node>
          <node concept="28WKNV" id="51wT2Ro_Cxf" role="28Wkcq">
            <property role="28WKNQ" value="true" />
          </node>
          <node concept="NO0$O" id="51wT2RoBCQB" role="28Wkcp">
            <property role="NNHLM" value="6ItNp1ooGDC/in" />
            <node concept="NNJI6" id="51wT2RoBCQC" role="NO0$P">
              <property role="NNJI7" value="payload.t.0.tg" />
            </node>
            <node concept="NNJI6" id="51wT2RoBCQD" role="NO0$Q">
              <property role="NNJI7" value="external.valueSets.disease-agent-targeted" />
            </node>
          </node>
        </node>
        <node concept="28Wkc2" id="51wT2Ro_Cxg" role="28L3fd">
          <node concept="NNJI6" id="51wT2Ro_Cxk" role="28Wkcv">
            <property role="NNJI7" value="payload.v.0" />
          </node>
          <node concept="28WKNV" id="51wT2Ro_Cxl" role="28Wkcq">
            <property role="28WKNQ" value="true" />
          </node>
          <node concept="NO0$O" id="51wT2RoBCQE" role="28Wkcp">
            <property role="NNHLM" value="6ItNp1ooGDC/in" />
            <node concept="NNJI6" id="51wT2RoBCQF" role="NO0$P">
              <property role="NNJI7" value="payload.v.0.tg" />
            </node>
            <node concept="NNJI6" id="51wT2RoBCQG" role="NO0$Q">
              <property role="NNJI7" value="external.valueSets.disease-agent-targeted" />
            </node>
          </node>
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2Ro$5s5" role="NZtHW">
      <property role="NZtHY" value="0000" />
      <property role="NZtHX" value="6ItNp1oo1qH/GR" />
      <property role="NZtEq" value="Exactly one type of event." />
      <property role="NZtEr" value="Entire HCert JSON (&quot;r&quot;, &quot;t&quot;, &quot;v&quot;)" />
      <node concept="NO0$O" id="51wT2Ro$kdq" role="28VK3c">
        <property role="NNHLM" value="51wT2RoDptl/equality" />
        <node concept="28WqtM" id="51wT2Ro$pJj" role="NO0$P">
          <node concept="28WIah" id="51wT2Ro$ApD" role="28Wqtf">
            <node concept="NNJI6" id="51wT2Ro$ApF" role="28WIai">
              <property role="NNJI7" value="payload.r" />
            </node>
            <node concept="NNJI6" id="51wT2Ro$ApK" role="28WIai">
              <property role="NNJI7" value="payload.t" />
            </node>
            <node concept="NNJI6" id="51wT2Ro$ApN" role="28WIai">
              <property role="NNJI7" value="payload.v" />
            </node>
          </node>
          <node concept="NO0$O" id="51wT2Ro$pJo" role="28Wqt9">
            <property role="NNHLM" value="51wT2Ro$pJs/plus" />
            <node concept="NNJI6" id="51wT2Ro$qsH" role="NO0$P">
              <property role="NNJI7" value="accumulator" />
            </node>
            <node concept="28Wkc2" id="51wT2Ro$wqJ" role="NO0$Q">
              <node concept="NNJI6" id="51wT2Ro$wqO" role="28Wkcv">
                <property role="NNJI7" value="current.0" />
              </node>
              <node concept="NO0vE" id="51wT2Ro$wqQ" role="28Wkcp">
                <property role="NO0vG" value="1" />
              </node>
              <node concept="NO0vE" id="51wT2Ro$wqS" role="28Wkcq">
                <property role="NO0vG" value="0" />
              </node>
            </node>
          </node>
          <node concept="NO0vE" id="51wT2Ro$wqU" role="28Wqta">
            <property role="NO0vG" value="0" />
          </node>
        </node>
        <node concept="NO0vE" id="51wT2Ro$kdt" role="NO0$Q">
          <property role="NO0vG" value="1" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2Ro_vLl" role="NZtHW">
      <property role="NZtHX" value="6ItNp1oo1qI/VR" />
      <property role="NZtHY" value="0000" />
      <property role="NZtEq" value="At most one v-event." />
      <property role="NZtEr" value="Entire HCert JSON (&quot;v&quot;)" />
      <node concept="28XmHU" id="51wT2Ro_vLh" role="28VK3c">
        <node concept="NNJI6" id="51wT2Ro_vLj" role="28XmHR">
          <property role="NNJI7" value="payload.v.1" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="6ItNp1oonBp" role="NZtHW">
      <property role="NZtHY" value="0001" />
      <property role="NZtHX" value="6ItNp1oo1qI/VR" />
      <property role="NZtEp" value="EMA must approve allowed vaccines." />
      <property role="NZtEq" value="Only vaccines in the allowed valueset that have been approved by the EMA are allowed." />
      <property role="NZtEr" value="Vaccination Part of the HCert (&quot;v&quot;)+ Valuesets + (&quot;v&quot;)+&quot;mp&quot;" />
      <node concept="28Wkc2" id="51wT2Ro_vLn" role="28VK3c">
        <node concept="NNJI6" id="51wT2Ro_vLr" role="28Wkcv">
          <property role="NNJI7" value="payload.v.0" />
        </node>
        <node concept="NO0$O" id="51wT2RoG1Qt" role="28Wkcp">
          <property role="NNHLM" value="6ItNp1ooGDC/in" />
          <node concept="NNJI6" id="51wT2Ro_vLt" role="NO0$P">
            <property role="NNJI7" value="payload.v.0.mp" />
          </node>
          <node concept="28WIah" id="4tyEeNK28q5" role="NO0$Q">
            <node concept="NMrYA" id="4Egmcn4uj$5" role="28WIai">
              <property role="NMrYD" value="EU/1/20/1528" />
            </node>
            <node concept="NMrYA" id="4Egmcn4uj$a" role="28WIai">
              <property role="NMrYD" value="EU/1/20/1507" />
            </node>
            <node concept="NMrYA" id="4Egmcn4uj$i" role="28WIai">
              <property role="NMrYD" value="EU/1/21/1529" />
            </node>
            <node concept="NMrYA" id="4Egmcn4uj$s" role="28WIai">
              <property role="NMrYD" value="EU/1/20/1525" />
            </node>
          </node>
        </node>
        <node concept="28WKNV" id="51wT2RoG1Q_" role="28Wkcq">
          <property role="28WKNQ" value="true" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="6ItNp1oonBs" role="NZtHW">
      <property role="NZtHY" value="0002" />
      <property role="NZtHX" value="6ItNp1oo1qI/VR" />
      <property role="NZtEq" value="Vaccination doses must be equal or greater than expected doses." />
      <property role="NZtEr" value="Vaccination Part of the HCert (&quot;v&quot;)+ Valuesets + &quot;dn&quot;+&quot;sd&quot;" />
      <property role="NZtEp" value="The vaccination course must be completed to provide enough protection." />
      <node concept="28Wkc2" id="51wT2Ro_vLx" role="28VK3c">
        <node concept="NNJI6" id="51wT2Ro_vL_" role="28Wkcv">
          <property role="NNJI7" value="payload.v.0" />
        </node>
        <node concept="NO0$O" id="51wT2RoA0K9" role="28Wkcp">
          <property role="NNHLM" value="6ItNp1olbka/geq" />
          <node concept="NNJI6" id="51wT2RoA0Kd" role="NO0$P">
            <property role="NNJI7" value="payload.v.0.dn" />
          </node>
          <node concept="NNJI6" id="51wT2RoA0Kf" role="NO0$Q">
            <property role="NNJI7" value="payload.v.0.sd" />
          </node>
        </node>
        <node concept="28WKNV" id="51wT2Ro_vLB" role="28Wkcq">
          <property role="28WKNQ" value="true" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2RoDoNI" role="NZtHW">
      <property role="NZtHY" value="0003" />
      <property role="NZtHX" value="6ItNp1oo1qI/VR" />
      <property role="NZtEq" value="Verification Datetime must be more than 14 days and less than 365 days after the last date of vaccination." />
      <property role="NZtEr" value="Vaccination Part of the HCert (&quot;v&quot;) + Valuesets + +&quot;dt&quot;" />
      <property role="NZtEp" value="The full vaccination protection starts up 14 days after vaccination and is valid for 365 days." />
      <node concept="28Wkc2" id="51wT2RoDoNK" role="28VK3c">
        <node concept="NNJI6" id="51wT2RoDoNP" role="28Wkcv">
          <property role="NNJI7" value="payload.v.0" />
        </node>
        <node concept="28L3fK" id="51wT2RoDpt8" role="28Wkcp">
          <property role="28L3fN" value="3h3ARDz8Wzm/notAfter" />
          <node concept="28LkpR" id="51wT2RoDvAb" role="28L3fd">
            <property role="28LkpK" value="14" />
            <node concept="NNJI6" id="51wT2RoDvAd" role="28LkpM">
              <property role="NNJI7" value="payload.v.0.dt" />
            </node>
          </node>
          <node concept="28LkpR" id="51wT2RoDvAg" role="28L3fd">
            <property role="28LkpK" value="0" />
            <node concept="NNJI6" id="51wT2RoDvAj" role="28LkpM">
              <property role="NNJI7" value="external.validationClock" />
            </node>
          </node>
          <node concept="28LkpR" id="51wT2RoDvAm" role="28L3fd">
            <property role="28LkpK" value="365" />
            <node concept="NNJI6" id="51wT2RoDvAp" role="28LkpM">
              <property role="NNJI7" value="payload.v.0.dt" />
            </node>
          </node>
        </node>
        <node concept="28WKNV" id="51wT2RoDoNR" role="28Wkcq">
          <property role="28WKNQ" value="true" />
        </node>
      </node>
    </node>
    <node concept="1X3_iC" id="4Egmcn4uj$y" role="lGtFl">
      <property role="3V$3am" value="rules" />
      <property role="3V$3ak" value="e82eb0de-3adc-4193-b887-7c66aff9edce/7754580153243539112/7754580153243539180" />
      <node concept="NZtGU" id="55O0TMOvOAA" role="8Wnug">
        <property role="NZtHY" value="0004" />
        <property role="NZtHX" value="6ItNp1oo1qI/VR" />
        <property role="NZtEq" value="The number of doses must be positive." />
        <node concept="28Wkc2" id="55O0TMOvOOb" role="28VK3c">
          <node concept="NNJI6" id="55O0TMOvOOk" role="28Wkcv">
            <property role="NNJI7" value="payload.v.0" />
          </node>
          <node concept="28WKNV" id="55O0TMOvY88" role="28Wkcq">
            <property role="28WKNQ" value="true" />
          </node>
          <node concept="NO0$O" id="55O0TMOvY7Y" role="28Wkcp">
            <property role="NNHLM" value="6ItNp1okL7p/gt" />
            <node concept="NO0vE" id="55O0TMOvY85" role="NO0$Q">
              <property role="NO0vG" value="0" />
            </node>
            <node concept="NNJI6" id="55O0TMOvY7V" role="NO0$P">
              <property role="NNJI7" value="payload.v.0.dn" />
            </node>
          </node>
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2RoDvAr" role="NZtHW">
      <property role="NZtHY" value="0000" />
      <property role="NZtHX" value="6ItNp1oo1qJ/TR" />
      <property role="NZtEq" value="At most one t-event." />
      <property role="NZtEr" value="Entire HCert JSON (&quot;t&quot;)" />
      <node concept="28XmHU" id="51wT2RoDvAt" role="28VK3c">
        <node concept="NNJI6" id="51wT2RoDvAw" role="28XmHR">
          <property role="NNJI7" value="payload.t.1" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2RoEgKZ" role="NZtHW">
      <property role="NZtHY" value="0001" />
      <property role="NZtHX" value="6ItNp1oo1qJ/TR" />
      <property role="NZtEp" value="The test type (tt) can be RAT or NAA." />
      <property role="NZtEq" value="The test type must be one of the value set list (RAT OR NAA)." />
      <property role="NZtEr" value="Test Part of the HCert (&quot;t&quot;)+ Valuesets + &quot;tt&quot;" />
      <node concept="28Wkc2" id="51wT2RoEgL1" role="28VK3c">
        <node concept="NNJI6" id="51wT2RoEgL6" role="28Wkcv">
          <property role="NNJI7" value="payload.t.0" />
        </node>
        <node concept="NO0$O" id="51wT2RoEgL8" role="28Wkcp">
          <property role="NNHLM" value="6ItNp1ooGDC/in" />
          <node concept="NNJI6" id="51wT2RoEgLc" role="NO0$P">
            <property role="NNJI7" value="payload.t.0.tt" />
          </node>
          <node concept="NNJI6" id="51wT2RoEgLe" role="NO0$Q">
            <property role="NNJI7" value="external.valueSets.covid-19-lab-test-type" />
          </node>
        </node>
        <node concept="28WKNV" id="55O0TMOvOdZ" role="28Wkcq">
          <property role="28WKNQ" value="true" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2RoEgLi" role="NZtHW">
      <property role="NZtHY" value="0002" />
      <property role="NZtHX" value="6ItNp1oo1qJ/TR" />
      <property role="NZtEp" value="If the test type is &quot;RAT&quot; then the test must be in the list of accepted RAT tests." />
      <property role="NZtEq" value="If the test type is &quot;RAT&quot; then the &quot;test product and manufacturer&quot; MUST be in the valueset list, if it's NAA return true." />
      <property role="NZtEr" value="Test Part of the HCert (&quot;t&quot;)+ Valuesets +&quot;tt&quot; + &quot;ma&quot;" />
      <node concept="28Wkc2" id="51wT2RoEkL7" role="28VK3c">
        <node concept="NO0$O" id="51wT2RoEkLc" role="28Wkcv">
          <property role="NNHLM" value="51wT2RoDptl/equality" />
          <node concept="NNJI6" id="51wT2RoEkLg" role="NO0$P">
            <property role="NNJI7" value="payload.t.0.tt" />
          </node>
          <node concept="NMrYA" id="4Egmcn4ujMX" role="NO0$Q">
            <property role="NMrYD" value="LP217198-3" />
          </node>
        </node>
        <node concept="NO0$O" id="51wT2RoEkLk" role="28Wkcp">
          <property role="NNHLM" value="6ItNp1ooGDC/in" />
          <node concept="NNJI6" id="51wT2RoEkLo" role="NO0$P">
            <property role="NNJI7" value="payload.t.0.ma" />
          </node>
          <node concept="NNJI6" id="51wT2RoEkLq" role="NO0$Q">
            <property role="NNJI7" value="external.valueSets.covid-19-lab-test-manufacturer-and-name" />
          </node>
        </node>
        <node concept="28WKNV" id="51wT2RoEkLs" role="28Wkcq">
          <property role="28WKNQ" value="true" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2RoEkLu" role="NZtHW">
      <property role="NZtHY" value="0003" />
      <property role="NZtHX" value="6ItNp1oo1qJ/TR" />
      <property role="NZtEp" value="The test must be performed " />
      <property role="NZtEq" value="DateTime of Sample Collection must be less than 72 hours before the Verification Datetime." />
      <property role="NZtEr" value="Test Part of the HCert (&quot;t&quot;)+ validation date (timestamp)+ Valuesets +&quot;sc&quot;" />
      <node concept="28Wkc2" id="51wT2RoEkLw" role="28VK3c">
        <node concept="NNJI6" id="51wT2RoEkL_" role="28Wkcv">
          <property role="NNJI7" value="payload.t.0" />
        </node>
        <node concept="NO0$O" id="51wT2RoEkLB" role="28Wkcp">
          <property role="NNHLM" value="3h3ARDz8Wzb/before" />
          <node concept="28LkpR" id="51wT2RoEkLF" role="NO0$P">
            <property role="28LkpK" value="0" />
            <node concept="NNJI6" id="51wT2RoEkLI" role="28LkpM">
              <property role="NNJI7" value="external.validationClock" />
            </node>
          </node>
          <node concept="28LkpR" id="51wT2RoEkLN" role="NO0$Q">
            <property role="28LkpK" value="72" />
            <property role="3_0wy9" value="55O0TMOtwBk/hour" />
            <node concept="NNJI6" id="51wT2RoEkLQ" role="28LkpM">
              <property role="NNJI7" value="payload.t.0.sc" />
            </node>
          </node>
        </node>
        <node concept="28WKNV" id="51wT2RoEkLS" role="28Wkcq">
          <property role="28WKNQ" value="true" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2RoEkLU" role="NZtHW">
      <property role="NZtHY" value="0004" />
      <property role="NZtHX" value="6ItNp1oo1qJ/TR" />
      <property role="NZtEq" value="Test result must be negative (&quot;not detected&quot;)." />
      <property role="NZtEr" value="Test Part of the HCert (&quot;t&quot;)+ Valuesets +&quot;tr&quot;" />
      <node concept="28Wkc2" id="51wT2RoEkLW" role="28VK3c">
        <node concept="NNJI6" id="51wT2RoEkM1" role="28Wkcv">
          <property role="NNJI7" value="payload.t.0" />
        </node>
        <node concept="NO0$O" id="51wT2RoEkM3" role="28Wkcp">
          <property role="NNHLM" value="51wT2RoDptl/equality" />
          <node concept="NNJI6" id="51wT2RoEkM7" role="NO0$P">
            <property role="NNJI7" value="payload.t.0.tr" />
          </node>
          <node concept="NMrYA" id="4Egmcn4ujN2" role="NO0$Q">
            <property role="NMrYD" value="260415000" />
          </node>
        </node>
        <node concept="28WKNV" id="51wT2RoEkMb" role="28Wkcq">
          <property role="28WKNQ" value="true" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2RoEkMd" role="NZtHW">
      <property role="NZtHY" value="0000" />
      <property role="NZtHX" value="6ItNp1oo1qK/RR" />
      <property role="NZtEq" value="At most one r-event." />
      <property role="NZtEr" value="Entire HCert JSON (&quot;r&quot;)" />
      <node concept="28XmHU" id="51wT2RoEkMf" role="28VK3c">
        <node concept="NNJI6" id="51wT2RoEkMi" role="28XmHR">
          <property role="NNJI7" value="payload.r.1" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2RoEkMk" role="NZtHW">
      <property role="NZtHY" value="0001" />
      <property role="NZtHX" value="6ItNp1oo1qK/RR" />
      <property role="NZtEp" value="The certificate must be valid." />
      <property role="NZtEq" value="The Verification Datetime must be between &quot;Certificate Valid From&quot; and &quot;Certificate Valid Until&quot;." />
      <property role="NZtEr" value="Recovery Part of the HCert (&quot;r&quot;)+ validation date (timestamp)+ Valuesets +&quot;df&quot; +&quot;du&quot;" />
      <node concept="28Wkc2" id="51wT2RoEkMm" role="28VK3c">
        <node concept="NNJI6" id="51wT2RoEkMr" role="28Wkcv">
          <property role="NNJI7" value="payload.r.0" />
        </node>
        <node concept="28L3fK" id="51wT2RoEkMt" role="28Wkcp">
          <property role="28L3fN" value="3h3ARDz8Wzm/notAfter" />
          <node concept="28LkpR" id="3XLz4IQktjC" role="28L3fd">
            <property role="28LkpK" value="0" />
            <node concept="NNJI6" id="51wT2RoEkMv" role="28LkpM">
              <property role="NNJI7" value="payload.r.0.df" />
            </node>
          </node>
          <node concept="28LkpR" id="3XLz4IQktjS" role="28L3fd">
            <property role="28LkpK" value="0" />
            <node concept="NNJI6" id="51wT2RoEkMx" role="28LkpM">
              <property role="NNJI7" value="external.validationClock" />
            </node>
          </node>
          <node concept="28LkpR" id="3XLz4IQktk8" role="28L3fd">
            <property role="28LkpK" value="0" />
            <node concept="NNJI6" id="51wT2RoEkM$" role="28LkpM">
              <property role="NNJI7" value="payload.r.0.du" />
            </node>
          </node>
        </node>
        <node concept="28WKNV" id="51wT2RoEkMA" role="28Wkcq">
          <property role="28WKNQ" value="true" />
        </node>
      </node>
    </node>
    <node concept="NZtGU" id="51wT2RoEkMC" role="NZtHW">
      <property role="NZtHY" value="0002" />
      <property role="NZtHX" value="6ItNp1oo1qK/RR" />
      <property role="NZtEp" value="The validity period of the certificate must be checked." />
      <property role="NZtEq" value="The validity start date must be greater than or equal to the first positive test date  +11 days and validity end date must be less than or equal to the first postive test date +180." />
      <property role="NZtEr" value="Recovery Part of the HCert (&quot;r&quot;)+ Valuesets + (&quot;fr&quot; +11 days) + ( fr+180 days)" />
      <node concept="28Wkc2" id="51wT2RoEkME" role="28VK3c">
        <node concept="NNJI6" id="51wT2RoEkMJ" role="28Wkcv">
          <property role="NNJI7" value="payload.r.0" />
        </node>
        <node concept="28L3fK" id="51wT2RoEkML" role="28Wkcp">
          <property role="28L3fN" value="6ItNp1okL7m/and" />
          <node concept="NO0$O" id="51wT2RoEkN0" role="28L3fd">
            <property role="NNHLM" value="3h3ARDz8Wzy/notBefore" />
            <node concept="28LkpR" id="51wT2RoEkN3" role="NO0$Q">
              <property role="28LkpK" value="11" />
              <node concept="NNJI6" id="51wT2RoEkN6" role="28LkpM">
                <property role="NNJI7" value="payload.r.0.fr" />
              </node>
            </node>
            <node concept="28LkpR" id="51wT2RoEkMN" role="NO0$P">
              <property role="28LkpK" value="0" />
              <node concept="NNJI6" id="51wT2RoEkMR" role="28LkpM">
                <property role="NNJI7" value="payload.r.0.df" />
              </node>
            </node>
          </node>
          <node concept="NO0$O" id="51wT2RoEkN9" role="28L3fd">
            <property role="NNHLM" value="3h3ARDz8Wzm/notAfter" />
            <node concept="28LkpR" id="51wT2RoEkNd" role="NO0$P">
              <property role="28LkpK" value="0" />
              <node concept="NNJI6" id="51wT2RoEkNg" role="28LkpM">
                <property role="NNJI7" value="payload.r.0.du" />
              </node>
            </node>
            <node concept="28LkpR" id="51wT2RoEkNi" role="NO0$Q">
              <property role="28LkpK" value="180" />
              <node concept="NNJI6" id="51wT2RoEkNl" role="28LkpM">
                <property role="NNJI7" value="payload.r.0.fr" />
              </node>
            </node>
          </node>
        </node>
        <node concept="28WKNV" id="51wT2RoEkMP" role="28Wkcq">
          <property role="28WKNQ" value="true" />
        </node>
      </node>
    </node>
  </node>
</model>

