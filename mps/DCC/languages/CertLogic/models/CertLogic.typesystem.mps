<?xml version="1.0" encoding="UTF-8"?>
<model ref="r:5f00eadd-749f-4978-b798-cb0a7c9543b6(CertLogic.typesystem)">
  <persistence version="9" />
  <languages>
    <use id="7a5dda62-9140-4668-ab76-d5ed1746f2b2" name="jetbrains.mps.lang.typesystem" version="5" />
    <devkit ref="00000000-0000-4000-0000-1de82b3a4936(jetbrains.mps.devkit.aspect.typesystem)" />
  </languages>
  <imports>
    <import index="u3iy" ref="r:c849d378-e965-4689-a87a-8119028c50b2(CertLogic.structure)" implicit="true" />
  </imports>
  <registry>
    <language id="f3061a53-9226-4cc5-a443-f952ceaf5816" name="jetbrains.mps.baseLanguage">
      <concept id="1080223426719" name="jetbrains.mps.baseLanguage.structure.OrExpression" flags="nn" index="22lmx$" />
      <concept id="1197027756228" name="jetbrains.mps.baseLanguage.structure.DotExpression" flags="nn" index="2OqwBi">
        <child id="1197027771414" name="operand" index="2Oq$k0" />
        <child id="1197027833540" name="operation" index="2OqNvi" />
      </concept>
      <concept id="1070475926800" name="jetbrains.mps.baseLanguage.structure.StringLiteral" flags="nn" index="Xl_RD">
        <property id="1070475926801" name="value" index="Xl_RC" />
      </concept>
      <concept id="1068580123155" name="jetbrains.mps.baseLanguage.structure.ExpressionStatement" flags="nn" index="3clFbF">
        <child id="1068580123156" name="expression" index="3clFbG" />
      </concept>
      <concept id="1068580123159" name="jetbrains.mps.baseLanguage.structure.IfStatement" flags="nn" index="3clFbJ">
        <child id="1068580123160" name="condition" index="3clFbw" />
        <child id="1068580123161" name="ifTrue" index="3clFbx" />
      </concept>
      <concept id="1068580123136" name="jetbrains.mps.baseLanguage.structure.StatementList" flags="sn" stub="5293379017992965193" index="3clFbS">
        <child id="1068581517665" name="statement" index="3cqZAp" />
      </concept>
      <concept id="1068580320020" name="jetbrains.mps.baseLanguage.structure.IntegerConstant" flags="nn" index="3cmrfG">
        <property id="1068580320021" name="value" index="3cmrfH" />
      </concept>
      <concept id="1081506762703" name="jetbrains.mps.baseLanguage.structure.GreaterThanExpression" flags="nn" index="3eOSWO" />
      <concept id="1081506773034" name="jetbrains.mps.baseLanguage.structure.LessThanExpression" flags="nn" index="3eOVzh" />
      <concept id="1081773326031" name="jetbrains.mps.baseLanguage.structure.BinaryOperation" flags="nn" index="3uHJSO">
        <child id="1081773367579" name="rightExpression" index="3uHU7w" />
        <child id="1081773367580" name="leftExpression" index="3uHU7B" />
      </concept>
      <concept id="1073239437375" name="jetbrains.mps.baseLanguage.structure.NotEqualsExpression" flags="nn" index="3y3z36" />
    </language>
    <language id="7a5dda62-9140-4668-ab76-d5ed1746f2b2" name="jetbrains.mps.lang.typesystem">
      <concept id="1175517767210" name="jetbrains.mps.lang.typesystem.structure.ReportErrorStatement" flags="nn" index="2MkqsV">
        <child id="1175517851849" name="errorString" index="2MkJ7o" />
      </concept>
      <concept id="1195213580585" name="jetbrains.mps.lang.typesystem.structure.AbstractCheckingRule" flags="ig" index="18hYwZ">
        <child id="1195213635060" name="body" index="18ibNy" />
      </concept>
      <concept id="1195214364922" name="jetbrains.mps.lang.typesystem.structure.NonTypesystemRule" flags="ig" index="18kY7G" />
      <concept id="3937244445246642777" name="jetbrains.mps.lang.typesystem.structure.AbstractReportStatement" flags="ng" index="1urrMJ">
        <child id="3937244445246642781" name="nodeToReport" index="1urrMF" />
      </concept>
      <concept id="1174642788531" name="jetbrains.mps.lang.typesystem.structure.ConceptReference" flags="ig" index="1YaCAy">
        <reference id="1174642800329" name="concept" index="1YaFvo" />
      </concept>
      <concept id="1174648085619" name="jetbrains.mps.lang.typesystem.structure.AbstractRule" flags="ng" index="1YuPPy">
        <child id="1174648101952" name="applicableNode" index="1YuTPh" />
      </concept>
      <concept id="1174650418652" name="jetbrains.mps.lang.typesystem.structure.ApplicableNodeReference" flags="nn" index="1YBJjd">
        <reference id="1174650432090" name="applicableNode" index="1YBMHb" />
      </concept>
    </language>
    <language id="7866978e-a0f0-4cc7-81bc-4d213d9375e1" name="jetbrains.mps.lang.smodel">
      <concept id="4705942098322467729" name="jetbrains.mps.lang.smodel.structure.EnumMemberReference" flags="ng" index="21nZrQ">
        <reference id="4705942098322467736" name="decl" index="21nZrZ" />
      </concept>
      <concept id="1138056022639" name="jetbrains.mps.lang.smodel.structure.SPropertyAccess" flags="nn" index="3TrcHB">
        <reference id="1138056395725" name="property" index="3TsBF5" />
      </concept>
      <concept id="1138056282393" name="jetbrains.mps.lang.smodel.structure.SLinkListAccess" flags="nn" index="3Tsc0h">
        <reference id="1138056546658" name="link" index="3TtcxE" />
      </concept>
      <concept id="2453008993612717257" name="jetbrains.mps.lang.smodel.structure.EnumSwitchCaseBody_StatementList" flags="ng" index="3X5gDB">
        <child id="2453008993612717258" name="statementList" index="3X5gD$" />
      </concept>
      <concept id="2453008993612559843" name="jetbrains.mps.lang.smodel.structure.EnumSwitchCase" flags="ng" index="3X5Udd">
        <child id="2453008993612717146" name="body" index="3X5gFO" />
        <child id="2453008993612559844" name="members" index="3X5Uda" />
      </concept>
      <concept id="2453008993612559839" name="jetbrains.mps.lang.smodel.structure.EnumSwitchExpression" flags="ng" index="3X5UdL">
        <child id="2453008993612714935" name="cases" index="3X5gkp" />
        <child id="2453008993612559840" name="enumExpression" index="3X5Ude" />
      </concept>
    </language>
    <language id="ceab5195-25ea-4f22-9b92-103b95ca8c0c" name="jetbrains.mps.lang.core">
      <concept id="1169194658468" name="jetbrains.mps.lang.core.structure.INamedConcept" flags="ng" index="TrEIO">
        <property id="1169194664001" name="name" index="TrG5h" />
      </concept>
    </language>
    <language id="83888646-71ce-4f1c-9c53-c54016f6ad4f" name="jetbrains.mps.baseLanguage.collections">
      <concept id="1162935959151" name="jetbrains.mps.baseLanguage.collections.structure.GetSizeOperation" flags="nn" index="34oBXx" />
    </language>
  </registry>
  <node concept="18kY7G" id="3XLz4IQktkp">
    <property role="TrG5h" value="check_VariadicInfixOperation" />
    <node concept="3clFbS" id="3XLz4IQktkq" role="18ibNy">
      <node concept="3clFbF" id="3XLz4IQkz0E" role="3cqZAp">
        <node concept="3X5UdL" id="3XLz4IQkz0A" role="3clFbG">
          <node concept="3X5Udd" id="3XLz4IQkHnS" role="3X5gkp">
            <node concept="21nZrQ" id="3XLz4IQkHr1" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:6ItNp1okL7m" resolve="and" />
            </node>
            <node concept="3X5gDB" id="3XLz4IQkHr6" role="3X5gFO">
              <node concept="3clFbS" id="3XLz4IQkHr8" role="3X5gD$">
                <node concept="3clFbJ" id="3XLz4IQkHrw" role="3cqZAp">
                  <node concept="3eOVzh" id="3XLz4IQkHrx" role="3clFbw">
                    <node concept="3cmrfG" id="3XLz4IQkHry" role="3uHU7w">
                      <property role="3cmrfH" value="2" />
                    </node>
                    <node concept="2OqwBi" id="3XLz4IQkHrz" role="3uHU7B">
                      <node concept="2OqwBi" id="3XLz4IQkHr$" role="2Oq$k0">
                        <node concept="1YBJjd" id="3XLz4IQkHr_" role="2Oq$k0">
                          <ref role="1YBMHb" node="3XLz4IQktks" resolve="node" />
                        </node>
                        <node concept="3Tsc0h" id="3XLz4IQkHrA" role="2OqNvi">
                          <ref role="3TtcxE" to="u3iy:51wT2RoDdvw" resolve="operands" />
                        </node>
                      </node>
                      <node concept="34oBXx" id="3XLz4IQkHrB" role="2OqNvi" />
                    </node>
                  </node>
                  <node concept="3clFbS" id="3XLz4IQkHrC" role="3clFbx">
                    <node concept="2MkqsV" id="3XLz4IQkHrD" role="3cqZAp">
                      <node concept="Xl_RD" id="3XLz4IQkHrE" role="2MkJ7o">
                        <property role="Xl_RC" value="An and operation requires at least 2 operands" />
                      </node>
                      <node concept="1YBJjd" id="3XLz4IQkHrF" role="1urrMF">
                        <ref role="1YBMHb" node="3XLz4IQktks" resolve="node" />
                      </node>
                    </node>
                  </node>
                </node>
              </node>
            </node>
          </node>
          <node concept="2OqwBi" id="3XLz4IQkz9c" role="3X5Ude">
            <node concept="1YBJjd" id="3XLz4IQkz13" role="2Oq$k0">
              <ref role="1YBMHb" node="3XLz4IQktks" resolve="node" />
            </node>
            <node concept="3TrcHB" id="3XLz4IQkzol" role="2OqNvi">
              <ref role="3TsBF5" to="u3iy:51wT2RoDdvu" resolve="operator" />
            </node>
          </node>
          <node concept="3X5Udd" id="3XLz4IQkzpR" role="3X5gkp">
            <node concept="21nZrQ" id="3XLz4IQkzpQ" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:51wT2RoDptl" resolve="equality" />
            </node>
            <node concept="21nZrQ" id="3XLz4IQkNJY" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:6ItNp1ooGDC" resolve="in" />
            </node>
            <node concept="21nZrQ" id="3XLz4IQkNK8" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:51wT2Ro$pJs" resolve="plus" />
            </node>
            <node concept="3X5gDB" id="3XLz4IQkzrn" role="3X5gFO">
              <node concept="3clFbS" id="3XLz4IQkzrp" role="3X5gD$">
                <node concept="3clFbJ" id="3XLz4IQkzry" role="3cqZAp">
                  <node concept="3y3z36" id="3XLz4IQkQ3L" role="3clFbw">
                    <node concept="3cmrfG" id="3XLz4IQkQ$j" role="3uHU7w">
                      <property role="3cmrfH" value="2" />
                    </node>
                    <node concept="2OqwBi" id="3XLz4IQk_4o" role="3uHU7B">
                      <node concept="2OqwBi" id="3XLz4IQkztO" role="2Oq$k0">
                        <node concept="1YBJjd" id="3XLz4IQkzrL" role="2Oq$k0">
                          <ref role="1YBMHb" node="3XLz4IQktks" resolve="node" />
                        </node>
                        <node concept="3Tsc0h" id="3XLz4IQkzwM" role="2OqNvi">
                          <ref role="3TtcxE" to="u3iy:51wT2RoDdvw" resolve="operands" />
                        </node>
                      </node>
                      <node concept="34oBXx" id="3XLz4IQkAFE" role="2OqNvi" />
                    </node>
                  </node>
                  <node concept="3clFbS" id="3XLz4IQkzr$" role="3clFbx">
                    <node concept="2MkqsV" id="3XLz4IQkC0L" role="3cqZAp">
                      <node concept="Xl_RD" id="3XLz4IQkC0X" role="2MkJ7o">
                        <property role="Xl_RC" value="An === operation requires exactly 2 operands" />
                      </node>
                      <node concept="1YBJjd" id="3XLz4IQkC2F" role="1urrMF">
                        <ref role="1YBMHb" node="3XLz4IQktks" resolve="node" />
                      </node>
                    </node>
                  </node>
                </node>
              </node>
            </node>
          </node>
          <node concept="3X5Udd" id="3XLz4IQkHDa" role="3X5gkp">
            <node concept="21nZrQ" id="3XLz4IQkHHL" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:6ItNp1olbka" resolve="geq" />
            </node>
            <node concept="21nZrQ" id="3XLz4IQkNJp" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:6ItNp1okL7p" resolve="gt" />
            </node>
            <node concept="21nZrQ" id="3XLz4IQkNJz" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:6ItNp1olbkg" resolve="leq" />
            </node>
            <node concept="21nZrQ" id="3XLz4IQkNJJ" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:6ItNp1okL7t" resolve="lt" />
            </node>
            <node concept="21nZrQ" id="3h3ARDz8WA7" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:3h3ARDz8Wz1" resolve="after" />
            </node>
            <node concept="21nZrQ" id="3h3ARDz8WAn" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:3h3ARDz8Wzb" resolve="before" />
            </node>
            <node concept="21nZrQ" id="3h3ARDz8WAD" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:3h3ARDz8Wzm" resolve="notAfter" />
            </node>
            <node concept="21nZrQ" id="3h3ARDz8WAX" role="3X5Uda">
              <ref role="21nZrZ" to="u3iy:3h3ARDz8Wzy" resolve="notBefore" />
            </node>
            <node concept="3X5gDB" id="3XLz4IQkHHS" role="3X5gFO">
              <node concept="3clFbS" id="3XLz4IQkHHU" role="3X5gD$">
                <node concept="3clFbJ" id="3XLz4IQkHI3" role="3cqZAp">
                  <node concept="22lmx$" id="3XLz4IQkJ2p" role="3clFbw">
                    <node concept="3eOSWO" id="3XLz4IQkN9p" role="3uHU7w">
                      <node concept="2OqwBi" id="3XLz4IQkKYY" role="3uHU7B">
                        <node concept="2OqwBi" id="3XLz4IQkJmJ" role="2Oq$k0">
                          <node concept="1YBJjd" id="3XLz4IQkJ7X" role="2Oq$k0">
                            <ref role="1YBMHb" node="3XLz4IQktks" resolve="node" />
                          </node>
                          <node concept="3Tsc0h" id="3XLz4IQkJ$X" role="2OqNvi">
                            <ref role="3TtcxE" to="u3iy:51wT2RoDdvw" resolve="operands" />
                          </node>
                        </node>
                        <node concept="34oBXx" id="3XLz4IQkMzy" role="2OqNvi" />
                      </node>
                      <node concept="3cmrfG" id="3XLz4IQkNmG" role="3uHU7w">
                        <property role="3cmrfH" value="3" />
                      </node>
                    </node>
                    <node concept="3eOVzh" id="3XLz4IQkHI4" role="3uHU7B">
                      <node concept="2OqwBi" id="3XLz4IQkHI6" role="3uHU7B">
                        <node concept="2OqwBi" id="3XLz4IQkHI7" role="2Oq$k0">
                          <node concept="1YBJjd" id="3XLz4IQkHI8" role="2Oq$k0">
                            <ref role="1YBMHb" node="3XLz4IQktks" resolve="node" />
                          </node>
                          <node concept="3Tsc0h" id="3XLz4IQkHI9" role="2OqNvi">
                            <ref role="3TtcxE" to="u3iy:51wT2RoDdvw" resolve="operands" />
                          </node>
                        </node>
                        <node concept="34oBXx" id="3XLz4IQkHIa" role="2OqNvi" />
                      </node>
                      <node concept="3cmrfG" id="3XLz4IQkHI5" role="3uHU7w">
                        <property role="3cmrfH" value="2" />
                      </node>
                    </node>
                  </node>
                  <node concept="3clFbS" id="3XLz4IQkHIb" role="3clFbx">
                    <node concept="2MkqsV" id="3XLz4IQkHIc" role="3cqZAp">
                      <node concept="Xl_RD" id="3XLz4IQkHId" role="2MkJ7o">
                        <property role="Xl_RC" value="A comparison operation takes 2 or 3 operands" />
                      </node>
                      <node concept="1YBJjd" id="3XLz4IQkHIe" role="1urrMF">
                        <ref role="1YBMHb" node="3XLz4IQktks" resolve="node" />
                      </node>
                    </node>
                  </node>
                </node>
              </node>
            </node>
          </node>
        </node>
      </node>
    </node>
    <node concept="1YaCAy" id="3XLz4IQktks" role="1YuTPh">
      <property role="TrG5h" value="node" />
      <ref role="1YaFvo" to="u3iy:51wT2RoDdvt" resolve="VariadicInfixOperation" />
    </node>
  </node>
</model>

